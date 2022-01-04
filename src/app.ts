import express, { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { TournamentRouter } from './controllers/TournamentRouter';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.app.use('/apiv1/tournament', new TournamentRouter().router);
    this.app.use(express.static(__dirname + '/static'));
    this.app.get('/*', (_, res) => {
      res.sendFile(join(__dirname + '/static/index.html'));
    });
  }

  private config(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH,DELETE'
      );
      next();
    });

    this.app.use((req, res, next) => {
      express.json()(req, res, (err) => {
        if (err) {
          return res.sendStatus(400);
        }
        next();
      });
    });
  }
}

export default new App().app;
