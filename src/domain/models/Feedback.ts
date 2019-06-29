import { TraineeId } from "../../value_object/TraineeId";
import { FeedbackId } from "../../value_object/FeedbackId";
import { TechnicalFeedback } from "../../value_object/Feedback/TechnicalFeedback";
import { HumanFeedback } from "../../value_object/Feedback/HumanFeedback";
import { ResultAndImprovement } from "../../value_object/Feedback/ResultAndImprovement";

export class Feedback {

    private readonly _traineeId: TraineeId;
    private readonly _feedbackId: FeedbackId;
    private readonly _technicalFeedback: TechnicalFeedback;
    private readonly _humanFeedback: HumanFeedback;
    private readonly _resultAndImprovement: ResultAndImprovement;

    constructor(
        traineeId: TraineeId,
        feedbackId: FeedbackId,
        technicalFeedback: TechnicalFeedback,
        humanFeedback: HumanFeedback,
        resultAndImprovement: ResultAndImprovement
    ) {
        this._traineeId = traineeId;
        this._feedbackId = feedbackId;
        this._technicalFeedback = technicalFeedback;
        this._humanFeedback = humanFeedback;
        this._resultAndImprovement = resultAndImprovement;
    }

    public get traineeId(): TraineeId {
        return this._traineeId;
    }

    public get feedbackId(): FeedbackId {
        return this._feedbackId;
    }

    public get technicalFeedback(): TechnicalFeedback {
        return this._technicalFeedback;
    }

    public get humanFeedback(): HumanFeedback {
        return this._humanFeedback;
    }

    public get resultAndImprovement(): ResultAndImprovement {
        return this._resultAndImprovement;
    }
}