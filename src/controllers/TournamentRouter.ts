import { Request, Response, Router } from 'express';
import { Tournament } from '../data/Tournament.schema';

export class TournamentRouter {
  public router: Router;
  public testTournament = {
    name: 'Pepsi Co',
    brandColor: '#004892',
    accentColor: '#e40028',
    logoLink: '/assets/images/pepsi-logo.png',
    playersNumber: 24,
    streamLink: 'https://www.pepsi.com/',
    tournamentName: 'FIFA World Cup',
  };
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
        res.status(200).send(this.testTournament);
      }
    });
    this.router.post('/', async (req: Request, res: Response) => {
      try {
        const result = new Tournament(req.body);
        await result.save();
        res.status(200).send({ success: true, result });
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.put('/:id', (req: Request, res: Response) =>
      res.status(200).send({ success: true })
    );
  }
}
