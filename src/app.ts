import express, { Request, Response, NextFunction } from 'express';
import { TestRoute } from './routes/test';
class App {
  public app: express.Application;
  public testRoute = new TestRoute();
  constructor() {
    this.app = express();
    this.config();
    this.testRoute.routes(this.app);
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
    const _app_folder = 'dist';

    this.app.use(express.static('dist'));

    this.app.use(express.static('/dist'));
    this.app.use((req, res, next) => {
      express.json()(req, res, err => {
        if (err) {
          console.error(err);
          return res.sendStatus(400);
        }

        next();
      });
    });
  }
}

export default new App().app;
