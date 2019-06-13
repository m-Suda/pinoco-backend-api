import * as express from 'express';
import {feedbackController} from "../application/Feedback/FeedbackController";
import * as validator from '../validator/FeedbackValidator';

class FeedbackRoutes {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/:userId/:feedbackId', (req: express.Request, res: express.Response) => {
            feedbackController.fetch(req, res);
        });
        this.router.post('/', validator.bodyParams, (req: express.Request, res: express.Response) => {
            feedbackController.register(req, res);
        });
        this.router.patch('/', validator.bodyParams, (req: express.Request, res: express.Response) => {
            feedbackController.modify(req, res);
        });
    }
}

export const feedbackRoutes = new FeedbackRoutes().router;