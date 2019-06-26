import { Feedback } from "../../domain/models/Feedback";

export class FeedbackPresenter {

    public feedbackConvert(result: Feedback) {
        return {
            traineeId: result.traineeId.value,
            feedbackId: result.feedbackId.value,
            feedback: result.feedback.value
        };
    }
}