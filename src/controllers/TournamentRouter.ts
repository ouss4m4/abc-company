import { Request, Response, Router } from 'express';
import { writeFileSync, createWriteStream } from 'fs';
import { join } from 'path';
import multer from 'multer';
import archiver from 'archiver';

import { Tournament } from '../data/Tournament.schema';
import { generateHtml } from '../site-generator/generatehtml';
import { ITournament } from '../data/Tournament.typing';

var storage = multer.diskStorage({
  destination: function (req: any, file: any, cb) {
    cb(null, 'dist/static');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e6);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export class TournamentRouter {
  public router: Router;
  public upload = multer({ storage: storage });

  constructor() {
    this.router = Router();
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.get('/:id', async (req: Request, res: Response) => {
      try {
        const tmid = req.params.id;
        const result = await Tournament.findById(tmid);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    /* tournament data and log upload */
    this.router.post(
      '/',
      (req, res, next) => {
        console.log('route reached', req.url);
        next();
      },
      this.upload.single('image'),
      async (req: Request, res: Response) => {
        try {
          req.body.logoLink = `${req.file?.filename}`;
          const result = new Tournament(req.body);
          await result.save();
          res.status(200).send({ success: true, result });
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      }
    );

    /* generate website and send it */
    this.router.get('/download/:id', async (req: Request, res: Response) => {
      try {
        const tmid = req.params.id;
        const result = await Tournament.findById(tmid);
        /* genereate html file */
        const htmlData = generateHtml(result as ITournament);
        // const filepath = (join(__dirname, 'tmp', 'client.html'), htmlData);
        const htmlfile = join(__dirname, '..', 'dist', 'static', 'client.html');
        writeFileSync(htmlfile, htmlData);

        /* grab logo */
        const imgfile = join(
          __dirname,
          '..',
          'dist',
          'static',
          result?.logoLink as string
        );
        await this.zipFiles(imgfile, htmlfile);
        res.download(__dirname + '/example.zip'); // Set disposition and send it.
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }

  private async zipFiles(imgpath: string, htmlpath: string) {
    // create a file to stream archive data to.
    const output = createWriteStream(__dirname + '/example.zip');
    const archive = archiver('zip', {
      zlib: { level: 1 }, // Sets the compression level.
    });
    archive.on('error', function (err) {
      throw err;
    });

    // pipe archive data to the output file
    archive.pipe(output);

    // append files
    archive.file(imgpath, {
      name: 'file0-or-change-this-whatever.txt',
    });
    archive.file(htmlpath, { name: 'index.html' });

    //
    return await archive.finalize();
  }
}
