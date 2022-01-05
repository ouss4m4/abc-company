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
        /* Fetch tournament details */
        const tmid = req.params.id;
        const result = await Tournament.findById(tmid);
        if (!result) {
          throw new Error('Tournament not found');
        }
        /* genereate html file */
        const htmlData = generateHtml(result as ITournament);
        const htmlpath = join(__dirname, '..', 'static', 'client.html');
        writeFileSync(htmlpath, htmlData);

        /* get img path */
        const imgpath = join(__dirname, '..', 'static', result.logoLink);

        /* calls archiver */
        this.zipFiles(imgpath, result.logoLink, htmlpath, 'index.html', res);
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    });
  }

  private async zipFiles(
    imgpath: string,
    imgname: string,
    htmlpath: string,
    htmlname: string,
    res: Response
  ) {
    // create a file to stream archive data to.
    const output = createWriteStream(__dirname + '/project.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });

    output.on('end', function () {
      console.log('Data has been drained');
    });

    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log(
        'archiver has been finalized and the output file descriptor has closed.'
      );
      res.download(__dirname + '/project.zip'); // Set disposition and send it.
    });

    archive.on('warning', function (err) {
      console.log(err);
    });

    archive.on('error', function (err) {
      console.log(err);
    });

    // pipe archive data to the output file
    archive.pipe(output);

    // append files
    archive.file(imgpath, {
      name: imgname,
    });
    archive.file(htmlpath, { name: htmlname });

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();
  }
}
