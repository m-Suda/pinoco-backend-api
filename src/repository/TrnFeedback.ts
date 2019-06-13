import { Postgres } from "../database/Postgres";
import { Feedback } from "../models/Feedback";

export class TrnFeedback {

    private DB: Postgres;

    constructor() {
        this.DB = Postgres.instance;
    }

    public async select(userId: string, feedbackId: string) {

        await this.DB.connect();

        const sql = `
            SELECT
                user_id
              , feedback_id
              , feedback
            FROM
                trn_feedback
            WHERE
                user_id = $1
            AND
                feedback_id = $2;
        `;
        const params = [userId, feedbackId];

        try {
            return await this.DB.execute(sql, params);
        } catch (e) {
            throw new Error(e);
        }

    }

    public async insert(feedback: Feedback) {

        await this.DB.connect();

        const sql = `
            INSERT INTO trn_feedback (
                user_id
              , feedback_id
              , feedback
              , create_user
              , create_date
              , update_user
              , update_date
            ) VALUES (
                $1
              , $2
              , $3
              , $4
              , to_char(now(), 'YYYYMMDDHH24MISS')
              , $5
              , to_char(now(), 'YYYYMMDDHH24MISS')
            );
        `;
        const params = [
            feedback.user_id,
            feedback.feedback_id,
            feedback.feedback,
            feedback.createUser,
            feedback.createUser
        ];

        try {
            await this.DB.execute(sql, params);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async update(feedback: Feedback) {

        await this.DB.connect();

        const sql = `
            UPDATE
                trn_feedback
            SET
                feedback = $1
              , update_user = $2
              , update_date = to_char(now(), 'YYYYMMDDHH25MISS')
            WHERE 
                user_id = $3
            AND
                feedback_id = $4;
        `;
        const params = [
            feedback.feedback,
            feedback.updateUser,
            feedback.user_id,
            feedback.feedback_id
        ];

        try {
            await this.DB.execute(sql, params);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const trnFeedback = new TrnFeedback();