import * as express from 'express';
import { AttendanceController } from "../application/Attendance/AttendanceController";
import * as validator from '../validator/AttendanceValidator';

class AttendanceRoutes {

    public router: express.Router = express.Router();

    constructor() {

        this.config();
    }

    private config(): void {
        this.router.get('/:userId/:year/:month', (req: express.Request, res: express.Response) => {
            AttendanceController.fetchMonthAttendance(req, res);
        });
        this.router.get('/:userId/:year/:month/:day', (req: express.Request, res: express.Response) => {
            AttendanceController.fetchDayAttendance(req, res);
        });
        this.router.post('/arrival', validator.bodyParams, (req: express.Request, res: express.Response) => {
            AttendanceController.arrival(req, res);
        });
        this.router.post('/leaving', validator.bodyParams, (req: express.Request, res: express.Response) => {
            AttendanceController.leaving(req, res);
        });
        this.router.patch('/', validator.bodyParams, (req: express.Request, res: express.Response) => {
            AttendanceController.modify(req, res);
        });
    }
}

export const attendanceRoutes = new AttendanceRoutes().router;