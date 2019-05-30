import { Attendance } from "../models/Attendance";
import { Postgres } from "../database/Postgres";

export class TrnAttendance {

    public static async selectMonthAttendance(userId: string, year: string, month: string) {
        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
            SELECT 
                user_id
              , year
              , month
              , day
              , attendance_time
              , leaving_time
              , daily_report
              , curriculum_name
              , understanding_degrees
              , progress_degrees
            FROM
                 trn_attendance
            WHERE user_id = $1
            AND year = $2
            AND month = $3
          ORDER BY day
        `;
        const params: string[] = [
            userId,
            year,
            month
        ];

        try {
            return await db.executeQuery(sql, params);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public static async selectDayAttendance(userId: any, year: string, month: string, day: string) {
        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
            SELECT
                user_id
              , year
              , month
              , day
              , attendance_time
              , leaving_time
              , daily_report
              , curriculum_name
              , understanding_degrees
              , progress_degrees
            FROM
              trn_attendance
            WHERE user_id = $1
            AND year = $2
            AND month = $3
            AND day = $4
        `;
        const params: string[] = [
            userId,
            year,
            month,
            day
        ];

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
          INSERT INTO trn_attendance (user_id, year, month, day, attendance_time)
          VALUES ($1, $2, $3, $4, $5);
        `;
        const params = [
            attendance.userId,
            attendance.year,
            attendance.month,
            attendance.day,
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
              , curriculum_name = $3
              , understanding_degrees = $4
              , progress_degrees = $5
            WHERE user_id = $6
            AND year = $7
            AND month = $8
            AND day = $9
        `;
        const params = [
            attendance.leavingTime,
            attendance.dailyReport,
            attendance.curriculumName,
            attendance.understandingDegrees,
            attendance.progressDegrees,
            attendance.userId,
            attendance.year,
            attendance.month,
            attendance.day,
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
            AND year = $4
            AND month = $5
            AND day = $6
        `;
        const params = [
            attendance.attendanceTime,
            attendance.leavingTime,
            attendance.userId,
            attendance.year,
            attendance.month,
            attendance.day,
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