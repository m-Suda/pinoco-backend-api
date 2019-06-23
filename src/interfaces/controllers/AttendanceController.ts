import { AttendanceRepository } from "../database/AttendanceRepository";
import { DailyReportRepository } from "../database/DailyReportRepository";
import { RegisterAttendanceTime } from "../../application/usecase/RegisterAttendanceTime";
import { RegisterLeavingTime } from "../../application/usecase/RegisterLeavingTime";
import { RegisterDailyReport } from "../../application/usecase/RegisterDailyReport";
import { IDBConnection } from "../database/IDBConnection";
import { Request, Response } from "express";
import { Attendance } from "../../domain/models/Attendance";
import { DailyReport } from "../../domain/models/DailyReport";
import { TraineeId } from "../../value_object/TraineeId";
import { YearMonthDay } from "../../value_object/YearMonthDay";
import { WorkStartTime } from "../../value_object/WorkStartTime";
import { WorkEndTime } from "../../value_object/WorkEndTime";
import { DailyReport as Report } from "../../value_object/DailyReport";
import { CurriculumName } from "../../value_object/CurriculumName";
import { UnderstandingDegrees } from "../../value_object/UnderstandingDegrees";
import { ProgressDegrees } from "../../value_object/ProgressDegrees";
import { FeedbackId } from "../../value_object/FeedbackId";
import * as moment from "moment";
import * as firebase from '../../infrastructure/firebase/firebaes';
import { AttendancePresenter } from "../presenter/AttendancePresenter";

export class AttendanceController {

    private readonly attendanceRepository: AttendanceRepository;
    private readonly dailyReportRepository: DailyReportRepository;
    private readonly attendancePresenter: AttendancePresenter;

    private readonly UNUSED_VALUE = '';
    private readonly INITIAL_VALUE_OF_DEGREE = 3;

    constructor(db: IDBConnection) {
        this.attendanceRepository = new AttendanceRepository(db);
        this.dailyReportRepository = new DailyReportRepository(db);
        this.attendancePresenter = new AttendancePresenter();
    }

    public async registerAttendanceTime(req: Request) {
        try {
            const uid = await firebase.decodeIdToken(req);
            const {yearMonthDay, workStartTime} = req.body;
            const attendance = new Attendance(
                new TraineeId(uid),
                new YearMonthDay(yearMonthDay),
                new WorkStartTime(workStartTime),
                new WorkEndTime(this.UNUSED_VALUE)
            );
            const useCase = new RegisterAttendanceTime(this.attendanceRepository);
            const registerAttendanceTimeResult: Attendance = await useCase.execute(attendance);
            return this.attendancePresenter.attendanceTimeConvert(registerAttendanceTimeResult);
        } catch (e) {
            throw e;
        }
    }

    public async registerLeavingTime(req: Request) {
        try {
            const uid = await firebase.decodeIdToken(req);
            const {yearMonthDay, workEndTime, dailyReport} = req.body;
            const attendance = new Attendance(
                new TraineeId(uid),
                new YearMonthDay(yearMonthDay),
                new WorkStartTime(this.UNUSED_VALUE),
                new WorkEndTime(workEndTime)
            );
            const registerLeavingTime = new RegisterLeavingTime(this.attendanceRepository);
            const registerLeavingTimeResult: Attendance = await registerLeavingTime.execute(attendance);

            const feedbackId = `${moment().format('YYYYMM')}-${moment().week()}`;
            const daily = new DailyReport(
                new TraineeId(uid),
                new YearMonthDay(yearMonthDay),
                new Report(dailyReport),
                new CurriculumName(this.UNUSED_VALUE),
                new UnderstandingDegrees(this.INITIAL_VALUE_OF_DEGREE),
                new ProgressDegrees(this.INITIAL_VALUE_OF_DEGREE),
                new FeedbackId(feedbackId)
            );
            const registerDailyReport = new RegisterDailyReport(this.dailyReportRepository);
            const registerDailyReportResult: DailyReport = await registerDailyReport.execute(daily);
            return this.attendancePresenter.leavingTimeConvert(registerLeavingTimeResult, registerDailyReportResult);
        } catch (e) {
            throw e;
        }
    }
}