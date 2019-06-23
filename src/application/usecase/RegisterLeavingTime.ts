import { IAttendanceRepository } from "../repositories/IAttendanceRepository";
import { Attendance } from "../../domain/models/Attendance";

export class RegisterLeavingTime {

    private readonly attendanceRepository: IAttendanceRepository;

    constructor(attendanceRepository: IAttendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public async execute(attendance: Attendance) {
        try {
            return await this.attendanceRepository.leaving(attendance);
        } catch (e) {
            throw e;
        }
    }
}