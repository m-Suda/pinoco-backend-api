import * as express from "express";
import { Postgres } from "../database/Postgres";
import { DailyReportController } from "../../interfaces/controllers/DailyReportController";

class DailyReportRoutes {

    public router: express.Router = express.Router();
    private readonly controller: DailyReportController;
    private readonly DBConnection = new Postgres();

    constructor() {
        this.controller = new DailyReportController(this.DBConnection);
        this.config();
    }

    private config(): void {
        this.router.patch('/learning-level', async (req: express.Request, res: express.Response) => {
            try {
                const result = await this.controller.editLearningLevel(req);
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

export const dailyReportRoutes = new DailyReportRoutes().router;