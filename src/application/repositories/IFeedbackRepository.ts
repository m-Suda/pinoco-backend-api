import { Feedback } from "../../domain/models/Feedback";
import { DBOperator } from "../../interfaces/database/DBOperator";
import { TraineeId } from "../../value_object/TraineeId";
import { FeedbackId } from "../../value_object/FeedbackId";

export abstract class IFeedbackRepository {

    abstract async register(feedback: Feedback, operator: DBOperator): Promise<Feedback>;
    abstract async fetchWeeklyReport(traineeId: TraineeId, feedbackId: FeedbackId): Promise<any>;
}