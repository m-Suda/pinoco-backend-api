import { FeedbackRepository } from "../database/FeedbackRepository";
import { IDBConnection } from "../database/IDBConnection";
import { Request } from "express";
import * as firebase from '../../infrastructure/firebase/firebaes';
import { Feedback } from "../../domain/models/Feedback";
import { TraineeId } from "../../value_object/TraineeId";
import { FeedbackId } from "../../value_object/FeedbackId";
import { Feedback as FeedbackText } from "../../value_object/Feedback";
import { DBOperator } from "../database/DBOperator";
import { RegisterFeedback } from "../../application/usecase/RegisterFeedback";
import { FeedbackPresenter } from "../presenter/FeedbackPresenter";

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
            const {traineeId, feedbackId, feedback} = req.body;
            const theTraineeFeedback: Feedback = new Feedback(
                new TraineeId(traineeId),
                new FeedbackId(feedbackId),
                new FeedbackText(feedback)
            );
            const operator: DBOperator = new DBOperator(uid);
            const useCase = new RegisterFeedback(this.feedbackRepository);
            const result: Feedback = await useCase.execute(theTraineeFeedback, operator);
            return this.feedbackPresenter.feedbackConvert(result);
        } catch (e) {
            throw e;
        }
    }
}