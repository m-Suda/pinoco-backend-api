import { Attendance } from "../../domain/models/Attendance";
import { DailyReport } from "../../domain/models/DailyReport";

export class AttendancePresenter {

    public attendanceTimeConvert(result: Attendance) {
        return {
            traineeId: result.traineeId.value,
            yearMonthDay: result.yearMonthDay.value,
            workStartTime: result.workStartTime.value
        };
    }

    public leavingTimeConvert(leavingTimeResult: Attendance, dailyReportResult: DailyReport) {
        return {
            traineeId: leavingTimeResult.traineeId.value,
            yearMonthDay: leavingTimeResult.yearMonthDay.value,
            workEndTime: leavingTimeResult.workEndTime.value,
            dailyReport: dailyReportResult.dailyReport.value,
            feedbackId: dailyReportResult.feedbackId.value
        }
    }
}