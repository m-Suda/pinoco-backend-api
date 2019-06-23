import { DailyReport } from "../../domain/models/DailyReport";

export class DailyReportPresenter {

    public learningLevelConvert(result: DailyReport) {
        return {
            traineeId: result.traineeId.value,
            yearMonthDay: result.yearMonthDay.value,
            curriculumName: result.curriculumName.value,
            understandingDegrees: result.understandingDegrees.value,
            progressDegrees: result.progressDegrees.value
        }
    }
}