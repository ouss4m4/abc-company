import { Request, Response } from 'express';

export class TestController {
  public async testEndpoint(req: Request, res: Response) {
    res.status(200).send({ success: true });
  }
}
