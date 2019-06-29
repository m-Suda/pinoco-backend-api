import { TraineeId } from "../../value_object/TraineeId";
import { YearMonthDay } from "../../value_object/YearMonthDay";
import { WorkStartTime } from "../../value_object/Attendance/WorkStartTime";
import { WorkEndTime } from "../../value_object/Attendance/WorkEndTime";

export class Attendance {

    private readonly _traineeId: TraineeId;
    private readonly _yearMonthDay: YearMonthDay;
    private readonly _workStartTime: WorkStartTime;
    private readonly _workEndTime: WorkEndTime;

    constructor(
        traineeId: TraineeId,
        yearMonthDay: YearMonthDay,
        workStartTime: WorkStartTime,
        workEndTime: WorkEndTime
    ) {
        this._traineeId = traineeId;
        this._yearMonthDay = yearMonthDay;
        this._workStartTime = workStartTime;
        this._workEndTime = workEndTime;
    }

    public get traineeId(): TraineeId {
        return this._traineeId;
    }

    public get yearMonthDay(): YearMonthDay {
        return this._yearMonthDay;
    }

    public get workStartTime(): WorkStartTime {
        return this._workStartTime;
    }

    public get workEndTime(): WorkEndTime {
        return this._workEndTime;
    }

}