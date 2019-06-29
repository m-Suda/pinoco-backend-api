import { DailyReportRepository } from "../database/DailyReportRepository";
import { IDBConnection } from "../database/IDBConnection";
import { Request } from "express";
import * as firebase from "../../infrastructure/firebase/firebaes";
import { DailyReport } from "../../domain/models/DailyReport";
import { Report as Report } from "../../value_object/DailyReport/Report";
import { CurriculumName } from "../../value_object/DailyReport/CurriculumName";
import { UnderstandingDegrees } from "../../value_object/DailyReport/UnderstandingDegrees";
import { ProgressDegrees } from "../../value_object/DailyReport/ProgressDegrees";
import { YearMonthDay } from "../../value_object/YearMonthDay";
import { TraineeId } from "../../value_object/TraineeId";
import { FeedbackId } from "../../value_object/FeedbackId";
import { DBOperator } from "../database/DBOperator";
import { EditLearningLevel } from "../../application/usecase/EditLearningLevel";
import { DailyReportPresenter } from "../presenter/DailyReportPresenter";

export class DailyReportController {

    private readonly dailyReportRepository: DailyReportRepository;
    private readonly dailyReportPresenter: DailyReportPresenter;

    private readonly UNUSED_VALUE = '';

    constructor(db: IDBConnection) {
        this.dailyReportRepository = new DailyReportRepository(db);
        this.dailyReportPresenter = new DailyReportPresenter();
    }

    public async editLearningLevel(req: Request) {
        try {
            const uid = await firebase.decodeIdToken(req);
            const {traineeId, yearMonthDay, curriculumName, understandingDegrees, progressDegrees} = req.body;
            const dailyReport = new DailyReport(
                new TraineeId(traineeId),
                new YearMonthDay(yearMonthDay),
                new Report(this.UNUSED_VALUE),
                new CurriculumName(curriculumName),
                new UnderstandingDegrees(understandingDegrees),
                new ProgressDegrees(progressDegrees),
                new FeedbackId(this.UNUSED_VALUE)
            );
            const operator = new DBOperator(uid);
            const useCase = new EditLearningLevel(this.dailyReportRepository);
            const editLearningLevelResult = await useCase.execute(dailyReport, operator);
            return this.dailyReportPresenter.learningLevelConvert(editLearningLevelResult);
        } catch (e) {
            throw e;
        }
    }
}