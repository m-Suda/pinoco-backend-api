import { TraineeId } from "../../value_object/TraineeId";
import { YearMonthDay } from "../../value_object/YearMonthDay";
import { UnderstandingDegrees } from "../../value_object/UnderstandingDegrees";
import { ProgressDegrees } from "../../value_object/ProgressDegrees";
import { FeedbackId } from "../../value_object/FeedbackId";
import { CurriculumName } from "../../value_object/CurriculumName";
import { DailyReport as Report} from "../../value_object/DailyReport";

export class DailyReport {

    private readonly _traineeId: TraineeId;
    private readonly _yearMonthDay: YearMonthDay;
    private readonly _dailyReport: Report;
    private readonly _curriculumName: CurriculumName;
    private readonly _understandingDegrees: UnderstandingDegrees;
    private readonly _progressDegrees: ProgressDegrees;
    private readonly _feedbackId: FeedbackId;

    constructor(
        traineeId: TraineeId,
        yearMonthDay: YearMonthDay,
        dailyReport: Report,
        curriculumName: CurriculumName,
        understandingDegrees: UnderstandingDegrees,
        progressDegrees: ProgressDegrees,
        feedbackId: FeedbackId
    ) {
        this._traineeId = traineeId;
        this._yearMonthDay = yearMonthDay;
        this._dailyReport = dailyReport;
        this._curriculumName = curriculumName;
        this._understandingDegrees = understandingDegrees;
        this._progressDegrees = progressDegrees;
        this._feedbackId = feedbackId;
    }

    public get traineeId(): TraineeId {
        return this._traineeId;
    }

    public get yearMonthDay(): YearMonthDay {
        return this._yearMonthDay;
    }

    public get dailyReport(): Report {
        return this._dailyReport;
    }

    public get curriculumName(): CurriculumName {
        return this._curriculumName;
    }

    public get understandingDegrees(): UnderstandingDegrees {
        return this._understandingDegrees;
    }

    public get progressDegrees(): ProgressDegrees {
        return this._progressDegrees;
    }

    public get feedbackId(): FeedbackId {
        return this._feedbackId;
    }
}