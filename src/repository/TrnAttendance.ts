import { Attendance } from "../models/Attendance";
import { Postgres } from "../database/Postgres";

export class TrnAttendance {

    public static async selectMonthAttendance(userId: string, startDate: string, endDate: string) {
        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
            SELECT 
                user_id
              , to_char(today, 'YYYY-MM-DD')
              , attendance_time
              , leaving_time
              , daily_report
              , curriculum_name
              , understanding_degrees
              , progress_degrees
            FROM
                 trn_attendance
            WHERE user_id = $1
            AND today BETWEEN $2 AND $3
          ORDER BY today
        `;
        const params: string[] = [
            userId,
            startDate,
            endDate
        ];

        try {
            return await db.executeQuery(sql, params);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public static async selectDayAttendance(userId: string, today: string) {
        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
            SELECT
                user_id
              , to_char(today, 'YYYY-MM-DD')
              , attendance_time
              , leaving_time
              , daily_report
              , curriculum_name
              , understanding_degrees
              , progress_degrees
            FROM
              trn_attendance
            WHERE user_id = $1
            AND today = $2
        `;
        const params: string[] = [
            userId,
            today
        ];

        console.log(today);
        try {
            return await db.executeQuery(sql, params);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public static async arrival(attendance: Attendance) {

        if (!attendance.hasOwnProperty('userId')) {
            throw new Error('UserId does not Exists');
        }

        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
          INSERT INTO trn_attendance (user_id, today, attendance_time)
          VALUES ($1, $2, $3);
        `;
        const params = [
            attendance.userId,
            attendance.today,
            attendance.attendanceTime
        ];

        try {
            await db.executeQuery(sql, params);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public static async leaving(attendance: Attendance) {
        if (!attendance.hasOwnProperty('userId')) {
            throw new Error('UserId does not Exists');
        }

        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
            UPDATE trn_attendance
            SET 
                leaving_time = $1
              , daily_report = $2
            WHERE user_id = $3
            AND today = $4
        `;
        const params = [
            attendance.leavingTime,
            attendance.dailyReport,
            attendance.userId,
            attendance.today,
        ];

        try {
            await db.executeQuery(sql, params);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public static async update(attendance: Attendance) {
        if (attendance.userId === '') {
            throw new Error('UserId does not Exists');
        }
        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
          UPDATE trn_attendance
          SET attendance_time = $1,
              leaving_time    = $2
          WHERE user_id = $3
            AND today = $4
        `;
        const params = [
            attendance.attendanceTime,
            attendance.leavingTime,
            attendance.userId,
            attendance.today,
        ];

        try {
            await db.executeQuery(sql, params);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }
}