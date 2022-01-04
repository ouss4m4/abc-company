import { Request, Response } from 'express';
import { ErrorHandler } from '../middleware/error';
import { TestController } from '../controllers/testController';

export class TestRoute {
  public testController = new TestController();
  public errorHandler: ErrorHandler = new ErrorHandler();

  public routes(app: any): void {
    app
      .route('/api/test')
      .get(
        this.errorHandler.handle((req: Request, res: Response) =>
          this.testController.testEndpoint(req, res)
        )
      );
  }
}
