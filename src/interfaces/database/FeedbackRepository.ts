import { IFeedbackRepository } from "../../application/repositories/IFeedbackRepository";
import { IDBConnection } from "./IDBConnection";
import { Feedback } from "../../domain/models/Feedback";
import { DBOperator } from "./DBOperator";

export class FeedbackRepository extends IFeedbackRepository {

    private db: IDBConnection;

    constructor(db: IDBConnection) {
        super();
        this.db = db;
    }

    public async register(feedback: Feedback, operator: DBOperator): Promise<Feedback> {

        await this.db.connect();

        const sql = `
            INSERT INTO 
                trn_feedback (
                    trainee_id, feedback_id, technical_feedback, human_feedback, result_and_improvement
                  , create_user, create_date, update_user, update_date                          
                ) VALUES (
                    $1, $2, $3, $4, $5
                  , $6, to_char(now(), 'YYYYMMDDHH24MISS'), $7, to_char(now(), 'YYYYMMDDHH24MISS')
                );`;
        const params = [
            feedback.traineeId.value,
            feedback.feedbackId.value,
            feedback.technicalFeedback.value,
            feedback.humanFeedback.value,
            feedback.resultAndImprovement.value,
            operator.uid,
            operator.uid
        ];

        await this.db.begin();
        try {
            await this.db.execute(sql, params);
            await this.db.commit();
            return feedback;
        } catch (e) {
            await this.db.rollback();
            throw e;
        }
    }

}