import { FeedbackRepository } from "../database/FeedbackRepository";
import { IDBConnection } from "../database/IDBConnection";
import { Request } from "express";
import * as firebase from '../../infrastructure/firebase/firebaes';
import { Feedback } from "../../domain/models/Feedback";
import { TraineeId } from "../../value_object/TraineeId";
import { FeedbackId } from "../../value_object/FeedbackId";
import { TechnicalFeedback } from "../../value_object/Feedback/TechnicalFeedback";
import { DBOperator } from "../database/DBOperator";
import { RegisterFeedback } from "../../application/usecase/RegisterFeedback";
import { FeedbackPresenter } from "../presenter/FeedbackPresenter";
import { HumanFeedback } from "../../value_object/Feedback/HumanFeedback";
import { ResultAndImprovement } from "../../value_object/Feedback/ResultAndImprovement";
import { FetchWeeklyReport } from "../../application/usecase/FetchWeeklyReport";
import { WeeklyReport } from "../../types/WeeklyReport";

export class FeedbackController {

    private readonly feedbackRepository: FeedbackRepository;
    private readonly feedbackPresenter: FeedbackPresenter;

    constructor(db: IDBConnection) {
        this.feedbackRepository = new FeedbackRepository(db);
        this.feedbackPresenter = new FeedbackPresenter();
    }

    public async registerFeedback(req: Request) {
        try {
            const uid = await firebase.decodeIdToken(req);
            const {traineeId, feedbackId, technicalFeedback, humanFeedback, resultAndImprovement} = req.body;
            const theTraineeFeedback: Feedback = new Feedback(
                new TraineeId(traineeId),
                new FeedbackId(feedbackId),
                new TechnicalFeedback(technicalFeedback),
                new HumanFeedback(humanFeedback),
                new ResultAndImprovement(resultAndImprovement)
            );
            const operator: DBOperator = new DBOperator(uid);
            const useCase = new RegisterFeedback(this.feedbackRepository);
            const result: Feedback = await useCase.execute(theTraineeFeedback, operator);
            return this.feedbackPresenter.feedbackConvert(result);
        } catch (e) {
            throw e;
        }
    }

    public async fetchWeeklyReport(req: Request) {
        try {
            const {traineeId, feedbackId} = req.params;
            const useCase = new FetchWeeklyReport(this.feedbackRepository);
            const result: Array<WeeklyReport> = await useCase.execute(new TraineeId(traineeId), new FeedbackId(feedbackId));
            return this.feedbackPresenter.weeklyReportConvert(result);
        } catch (e) {
            throw e;
        }
    }
}