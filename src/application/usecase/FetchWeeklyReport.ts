import { IFeedbackRepository } from "../repositories/IFeedbackRepository";
import { TraineeId } from "../../value_object/TraineeId";
import { FeedbackId } from "../../value_object/FeedbackId";
import { WeeklyReport } from "../../types/WeeklyReport";

export class FetchWeeklyReport {

    private readonly feedbackRepository: IFeedbackRepository;

    constructor(feedbackRepository: IFeedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public async execute(traineeId: TraineeId, feedbackId: FeedbackId): Promise<Array<WeeklyReport>> {
        try {
            return await this.feedbackRepository.fetchWeeklyReport(traineeId, feedbackId);
        } catch (e) {
            throw e;
        }
    }

}