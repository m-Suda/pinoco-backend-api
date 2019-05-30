import { Attendance } from "../../models/Attendance";
import { TrnAttendance } from "../../repository/TrnAttendance";
import { CurrentTime } from "../../models/CurrentTime";

export class AttendanceService {

    public static async fetchMonthAttendance(userId: string, year: string, month: string) {
        try {
            return await TrnAttendance.selectMonthAttendance(userId, year, month);
        } catch (e) {
            console.error('【勤怠情報取得(月)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async fetchDayAttendance(userId: any, year: string, month: string, day: string) {
        try {
            return await TrnAttendance.selectDayAttendance(userId, year, month, day);
        } catch (e) {
            console.error('【勤怠情報取得(日)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async arrival(uid: string) {
        const now = new CurrentTime();
        const attendance = new Attendance({
            userId: uid,
            year: now.getYear(),
            month: now.getMonth(),
            day: now.getDay(),
            attendanceTime: now.getTimeHHmmss()
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
        const now = new CurrentTime();
        attendance.year = now.getYear();
        attendance.month = now.getMonth();
        attendance.day = now.getDay();
        attendance.leavingTime = now.getTimeHHmmss();
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