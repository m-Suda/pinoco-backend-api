import { Feedback } from "../../domain/models/Feedback";
import { DBOperator } from "../../interfaces/database/DBOperator";

export abstract class IFeedbackRepository {

    abstract async register(feedback: Feedback, operator: DBOperator): Promise<Feedback>;
}