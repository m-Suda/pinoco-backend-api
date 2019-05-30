///<reference path="AttendanceService.ts"/>
import { Request, Response } from "express";
import { AttendanceService } from "./AttendanceService";
import { validationResult } from "express-validator/check";
import * as firebase from '../../firebase/firebaes';
import { Attendance } from "../../models/Attendance";

export class AttendanceController {
    public static async fetchMonthAttendance(req: Request, res: Response) {
        try {
            const result = await AttendanceService.fetchMonthAttendance(req.params.userId, req.params.year, req.params.month);
            res.status(200).send({
                attendance: result
            });
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Month Fetch Failed!'
            });
        }
    }

    public static async fetchDayAttendance(req: Request, res: Response) {
        try {
            const result = await AttendanceService.fetchDayAttendance(req.params.userId, req.params.year, req.params.month, req.params.day);
            res.status(200).send({
                attendance: result[ 0 ]
            });
        } catch (e) {
            res.status(500).send({
                message: 'Day FetchAll Failed!'
            });
        }
    }

    public static async arrival(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(402).send({
                errors: errors.array()
            });
            return;
        }
        try {
            const uid: string = await firebase.decodeIdToken(req);
            const attendanceTime = await AttendanceService.arrival(uid);
            res.status(200).send({
                attendanceTime,
                message: 'Arrival Success!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Arrival Failed!'
            });
        }
    }

    public static async leaving(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(402).send({
                errors: errors.array()
            });
            return;
        }
        try {
            const userId: string = await firebase.decodeIdToken(req);
            const dailyReport = req.body.dailyReport;
            const curriculumName = req.body.curriculumName;
            const understandingDegrees = req.body.understandingDegrees;
            const progressDegrees = req.body.progressDegrees;
            const attendance = new Attendance({
                userId,
                dailyReport,
                curriculumName,
                understandingDegrees,
                progressDegrees
            });
            const leavingTime = await AttendanceService.leaving(attendance);
            res.status(200).send({
                leavingTime,
                message: 'Leaving Success!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Leaving Failed!'
            });
        }
    }

    public static async modify(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(402).send({
                errors: errors.array()
            });
            return;
        }
        try {
            await AttendanceService.modify(new Attendance(req.body));
            res.status(200).send({
                message: 'Attendance Modify Success!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Attendance Modify Failed!'
            });
        }
    }
}