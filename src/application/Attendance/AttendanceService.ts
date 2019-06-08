import { Attendance } from "../../models/Attendance";
import { TrnAttendance } from "../../repository/TrnAttendance";
import * as moment from 'moment';

export class AttendanceService {

    public static async fetchMonthAttendance(userId: string, yyyyHyphenMM: string) {
        // TODO: yyyy-mm 形式で渡される前提
        const lastDayOfMonth = moment(yyyyHyphenMM, 'YYYY-MM').daysInMonth();
        const startDate = `${yyyyHyphenMM}-01 00:00:00`;
        const endDate = `${yyyyHyphenMM}-${lastDayOfMonth} 23:59:59`;
        try {
            return await TrnAttendance.selectMonthAttendance(userId, startDate, endDate);
        } catch (e) {
            console.error('【勤怠情報取得(月)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async fetchDayAttendance(userId: string, day: string) {
        try {
            return await TrnAttendance.selectDayAttendance(userId, `${day} 00:00:00`);
        } catch (e) {
            console.error('【勤怠情報取得(日)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async arrival(uid: string) {
        const attendance = new Attendance({
            userId: uid,
            today: moment().format('YYYY-MM-DD 00:00:00'),
            attendanceTime: moment().format('HH:mm:ss')
        });
        try {
            await TrnAttendance.arrival(attendance);
            return attendance.attendanceTime;
        } catch (e) {
            console.error('【出勤処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async leaving(attendance: Attendance) {
        attendance.leavingTime = moment().format('hh:mm:ss');
        try {
            await TrnAttendance.leaving(attendance);
            return attendance.leavingTime;
        } catch (e) {
            console.error('【退勤処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async modify(attendance: Attendance) {
        try {
            await TrnAttendance.update(attendance);
        } catch (e) {
            console.error('【勤怠更新処理でエラー】');
            console.error(e);
            throw e;
        }
    }
}