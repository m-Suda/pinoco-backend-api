import * as express from "express";
import { Postgres } from "../database/Postgres";
import { FeedbackController } from "../../interfaces/controllers/FeedbackController";

class FeedbackRoutes {

    public router: express.Router = express.Router();
    private readonly controller: FeedbackController;
    private readonly DBConnection = new Postgres();

    constructor() {
        this.controller = new FeedbackController(this.DBConnection);
        this.config();
    }

    private config(): void {
        this.router.get('/weekly/:traineeId/:feedbackId', async (req: express.Request, res: express.Response) => {
            try {
                const result = await this.controller.fetchWeeklyReport(req);
                res.status(200).send(result);
            } catch (e) {
                console.error(e);
                res.status(500).send({
                    message: e.message
                });
            }
        });
        this.router.post('/', async (req: express.Request, res: express.Response) => {
            try {
                const result = await this.controller.registerFeedback(req);
                res.status(200).send(result);
            } catch (e) {
                console.error(e);
                res.status(500).send({
                    message: e.message
                });
            }
        });
    }

}

export const feedbackRoutes = new FeedbackRoutes().router;