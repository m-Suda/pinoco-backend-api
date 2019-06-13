import { trnFeedback } from "../../repository/TrnFeedback";
import { RequestBodyFeedback } from "../../models/RequestBodyFeedback";
import { Feedback } from "../../models/Feedback";

class FeedbackService {

    /**
     * フィードバックを取得する。
     * @param userId
     * @param feedbackId
     */
    public async select(userId: string, feedbackId: string) {
        try {
            return await trnFeedback.select(userId, feedbackId);
        } catch (e) {
            throw e;
        }
    }

    /**
     * フィードバックを作成する。
     * @param body
     * @param userId
     */
    public async insert(body: RequestBodyFeedback, userId: string) {
        try {
            const feedback: Feedback = new Feedback(body);
            feedback.createUser = userId;
            feedback.updateUser = userId;
            await trnFeedback.insert(feedback);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * フィードバックを更新する。
     * @param body
     * @param userId
     */
    public async update(body: RequestBodyFeedback, userId: string) {
        const feedback: Feedback = new Feedback(body);
        feedback.updateUser = userId;

        try {
            await trnFeedback.update(feedback);
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const feedbackService = new FeedbackService();