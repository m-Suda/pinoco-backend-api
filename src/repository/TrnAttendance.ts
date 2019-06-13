import { Attendance } from "../models/Attendance";
import { Postgres } from "../database/Postgres";

export class TrnAttendance {

    public static async selectMonthAttendance(userId: string, startDate: string, endDate: string) {
        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
            SELECT 
                user_id
              , to_char(year_month_day, 'YYYY-MM-DD')
              , work_start_time
              , work_end_time
              , daily_report
              , curriculum_name
              , understanding_degrees
              , progress_degrees
            FROM
                 trn_attendance
            WHERE user_id = $1
            AND year_month_day BETWEEN $2 AND $3
          ORDER BY year_month_day
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
              , to_char(year_month_day, 'YYYY-MM-DD')
              , work_start_time
              , work_end_time
              , daily_report
              , curriculum_name
              , understanding_degrees
              , progress_degrees
            FROM
              trn_attendance
            WHERE user_id = $1
            AND year_month_day = $2
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
          INSERT INTO trn_attendance (user_id, year_month_day, work_start_time)
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
                work_end_time = $1
              , daily_report = $2
            WHERE user_id = $3
            AND year_month_day = $4
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
          SET work_start_time = $1,
              work_end_time    = $2
          WHERE user_id = $3
            AND year_month_day = $4
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