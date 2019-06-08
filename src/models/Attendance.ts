export class Attendance {

    userId?: string;
    today?: string;
    attendanceTime?: string;
    leavingTime?: string;
    dailyReport?: string;
    curriculumName?: string;
    understandingDegrees?: number;
    progressDegrees?: number;

    constructor(init?: Partial<Attendance>) {
        Object.assign(this, init);
    }
}