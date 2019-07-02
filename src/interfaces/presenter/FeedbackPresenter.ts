import { Feedback } from "../../domain/models/Feedback";
import { WeeklyReport } from "../../types/WeeklyReport";

export class FeedbackPresenter {

    public feedbackConvert(result: Feedback) {
        return {
            traineeId: result.traineeId.value,
            feedbackId: result.feedbackId.value,
            feedback: result.technicalFeedback.value
        };
    }

    public weeklyReportConvert(result: Array<WeeklyReport>) {
        const dailyReports = result.map(report => this.toReportObject(report));
        const feedback = {
            technicalFeedback: result[0].technical_feedback || '',
            humanFeedback: result[0].human_feedback || '',
            resultAndImprovement: result[0].result_and_improvement || ''
        };
        return {
            traineeId: result[0].trainee_id || '',
            feedbackId: result[0].feedback_id || '',
            dailyReports,
            feedback
        };
    }

    private toReportObject(data: WeeklyReport) {
        return {
            year_month_day: data.year_month_day,
            report: data.report,
            curriculumName: data.curriculum_name,
            understandingDegrees: data.understanding_degrees,
            progressDegrees: data.progress_degrees
        };
    }
}