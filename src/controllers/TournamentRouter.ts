import { Request, Response, Router } from 'express';
import { Tournament } from '../data/Tournament.schema';
import multer from 'multer';
import { join } from 'path';
import { generateHtml } from '../site-generator/generatehtml';
import { ITournament } from '../data/Tournament.typing';
import { writeFileSync } from 'fs';
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

        res.download(htmlfile); // Set disposition and send it.
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
    this.router.put('/:id', (req: Request, res: Response) =>
      res.status(200).send({ success: true })
    );
  }
}

/* const file = join(
          __dirname,
          '..',
          '..',
          'dist',
          'static',
          result?.logoLink as string
        ); */
