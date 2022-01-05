import { Request, Response, Router } from 'express';
import { Tournament } from '../data/Tournament.schema';
import multer from 'multer';

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
  /* public testTournament = {
    name: 'Pepsi Co',
    brandColor: '#004892',
    accentColor: '#e40028',
    logoLink: '/assets/images/pepsi-logo.png',
    playersNumber: 24,
    streamLink: 'https://www.pepsi.com/',
    tournamentName: 'FIFA World Cup',
  }; */
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
    this.router.post(
      '/',
      (req, res, next) => {
        console.log('route reached', req.url);
        next();
      },
      this.upload.single('image'),
      async (req: Request, res: Response) => {
        console.log(req.file);
        try {
          console.log(req.body);
          req.body.logoLink = `/${req.file?.filename}`;
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
