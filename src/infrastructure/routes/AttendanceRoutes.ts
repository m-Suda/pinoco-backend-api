import * as express from 'express';
import { AttendanceController } from "../../interfaces/controllers/AttendanceController";
import { Postgres } from "../database/Postgres";

class AttendanceRoutes {

    public router: express.Router = express.Router();
    private readonly controller: AttendanceController;
    private readonly DBConnection = new Postgres();

    constructor() {
        this.controller = new AttendanceController(this.DBConnection);
        this.config();
    }

    private config(): void {
        this.router.post('/arrival', async (req: express.Request, res: express.Response) => {
            try {
                const result = await this.controller.registerAttendanceTime(req);
                res.status(200).send(result);
            } catch (e) {
                console.error(e);
                res.status(500).send({
                    message: e.message
                });
            }
        });
        this.router.post('/leaving', async (req: express.Request, res: express.Response) => {
            try {
                const result = await this.controller.registerLeavingTime(req);
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

export const attendanceRoutes = new AttendanceRoutes().router;