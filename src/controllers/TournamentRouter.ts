import { Request, Response, Router } from 'express';

export class TournamentRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.get('/', (req: Request, res: Response) =>
      res.status(200).send({ success: true })
    );
    this.router.post('/', (req: Request, res: Response) =>
      res.status(200).send({ success: true })
    );
    this.router.put('/:id', (req: Request, res: Response) =>
      res.status(200).send({ success: true })
    );
  }
}
