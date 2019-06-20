import { TraineeName } from "../value_object/TraineeName";
import { TraineeId } from "../value_object/TraineeId";
import { AssignedInstructorId } from "../value_object/AssignedInstructorId";
import { TraineeStartDate } from "../value_object/TraineeStartDate";
import { TraineeEndDate } from "../value_object/TraineeEndDate";
import { CompanyId } from "../value_object/CompanyId";

export class Trainee {

    private _traineeId: TraineeId;
    private _traineeName: TraineeName;
    private _assignedInstructorId: AssignedInstructorId;
    private _traineeStartDate: TraineeStartDate;
    private _traineeEndDate: TraineeEndDate;
    private _companyId: CompanyId;

    constructor(
        traineeId: TraineeId,
        traineeName: TraineeName,
        assignedInstructorId: AssignedInstructorId,
        traineeStartDate: TraineeStartDate,
        traineeEndDate: TraineeEndDate,
        companyId: CompanyId
    ) {
        this._traineeId = traineeId;
        this._traineeName = traineeName;
        this._assignedInstructorId = assignedInstructorId;
        this._traineeStartDate = traineeStartDate;
        this._traineeEndDate = traineeEndDate;
        this._companyId = companyId;
    }

    public get traineeId(): TraineeId {
        return this._traineeId;
    }

    public get traineeName(): TraineeName {
        return this._traineeName;
    }
    public get assignedInstructorId(): AssignedInstructorId {
        return this._assignedInstructorId;
    }
    public get traineeStartDate(): TraineeStartDate {
        return this._traineeStartDate;
    }
    public get traineeEndDate(): TraineeEndDate {
        return this._traineeEndDate;
    }
    public get companyId(): CompanyId {
        return this._companyId;
    }
}