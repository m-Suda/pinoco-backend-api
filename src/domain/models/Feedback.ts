import { TraineeId } from "../../value_object/TraineeId";
import { FeedbackId } from "../../value_object/FeedbackId";
import { Feedback as FeedbackText } from "../../value_object/Feedback";

export class Feedback {

    private readonly _traineeId: TraineeId;
    private readonly _feedbackId: FeedbackId;
    private readonly _feedback: FeedbackText;

    constructor(
        traineeId: TraineeId,
        feedbackId: FeedbackId,
        feedback: FeedbackText
    ) {
        this._traineeId = traineeId;
        this._feedbackId = feedbackId;
        this._feedback = feedback;
    }

    public get traineeId(): TraineeId {
        return this._traineeId;
    }

    public get feedbackId(): FeedbackId {
        return this._feedbackId;
    }

    public get feedback(): FeedbackText {
        return this._feedback;
    }
}