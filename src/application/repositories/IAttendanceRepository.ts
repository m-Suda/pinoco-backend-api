import { Attendance } from "../../domain/models/Attendance";

export abstract class IAttendanceRepository {

    abstract async arrival(attendance: Attendance): Promise<any>;
    abstract async leaving(attendance: Attendance): Promise<any>;
}