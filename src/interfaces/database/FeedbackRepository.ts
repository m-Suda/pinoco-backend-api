import { IFeedbackRepository } from "../../application/repositories/IFeedbackRepository";
import { IDBConnection } from "./IDBConnection";
import { Feedback } from "../../domain/models/Feedback";
import { DBOperator } from "./DBOperator";
import { TraineeId } from "../../value_object/TraineeId";
import { FeedbackId } from "../../value_object/FeedbackId";
import { WeeklyReport } from "../../types/WeeklyReport";

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

    async fetchWeeklyReport(traineeId: TraineeId, feedbackId: FeedbackId): Promise<Array<WeeklyReport>> {

        await this.db.connect();

        const sql = `
            SELECT
                report.trainee_id
              , report.feedback_id
              , to_char(year_month_day, 'YYYY-MM-DD HH24:MI:SS') as year_month_day
              , report
              , curriculum_name
              , understanding_degrees
              , progress_degrees
              , technical_feedback
              , human_feedback
              , result_and_improvement
            FROM
                trn_daily_report as report
            LEFT JOIN 
                trn_feedback as feedback
                ON feedback.feedback_id = report.feedback_id
                AND feedback.trainee_id = $1
                AND feedback.feedback_id = $2
            WHERE 
                report.trainee_id = $3
            AND
                report.feedback_id = $4
            ORDER BY year_month_day ASC;
        `;
        const params = [
            traineeId.value,
            feedbackId.value,
            traineeId.value,
            feedbackId.value
        ];

        try {
            return await this.db.execute(sql, params);
        } catch (e) {
            throw e;
        }
    }
}