import { IAttendanceRepository } from "../repositories/IAttendanceRepository";
import { Attendance } from "../../domain/models/Attendance";

/**
 * 出勤時間登録ユースケース
 * @class RegisterAttendanceTime
 * @classdesc 出勤時間を登録するユースケースクラス
 * @author m-Suda
 */
export class RegisterAttendanceTime {

    /**
     * 勤怠リポジトリ
     * @description 勤怠の永続化を担う
     */
    private readonly attendanceRepository: IAttendanceRepository;

    /**
     * @description リポジトリをDIする。
     * @param {IAttendanceRepository} attendanceRepository
     */
    constructor(attendanceRepository: IAttendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    /**
     * @description 出勤時間を登録する。
     * @param {Attendance} attendance - traineeID, yearMonthDay, workStartTimeを含むオブジェクト
     * @return {Promise<Attendance>}
     */
    public async execute(attendance: Attendance): Promise<Attendance> {
        try {
            return await this.attendanceRepository.arrival(attendance);
        } catch (e) {
            throw e;
        }
    }
}