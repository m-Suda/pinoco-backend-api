import { IAttendanceRepository } from "../../application/repositories/IAttendanceRepository";
import { Attendance } from "../../domain/models/Attendance";
import { IDBConnection } from "./IDBConnection";

export class AttendanceRepository extends IAttendanceRepository {

    private db: IDBConnection;

    constructor(db: IDBConnection) {
        super();
        this.db = db;
    }

    public async arrival(attendance: Attendance): Promise<Attendance> {

        await this.db.connect();

        const sql = `
            INSERT INTO 
              trn_attendance (
                  trainee_id, year_month_day, work_start_time
                , create_user, create_date, update_user, update_date                            
              ) VALUES (
                  $1, $2, $3
                , $4, to_char(now(), 'YYYYMMDDHH24MISS'), $5, to_char(now(), 'YYYYMMDDHH24MISS')
              );`;
        const params = [
            attendance.traineeId.value,
            attendance.yearMonthDay.value,
            attendance.workStartTime.value,
            attendance.traineeId.value,
            attendance.traineeId.value,
        ];

        await this.db.begin();
        try {
            await this.db.execute(sql, params);
            await this.db.commit();
            return attendance;
        } catch (e) {
            await this.db.rollback();
            throw e;
        }
        // finally {
        //     await this.db.end();
        // }
    }

    public async leaving(attendance: Attendance): Promise<Attendance> {

        await this.db.connect();

        const sql = `
            UPDATE
                trn_attendance
            SET
                work_end_time = $1
              , update_user = $2
              , update_date = to_char(now(), 'YYYYMMDDHH24MISS')
            WHERE 
                trainee_id = $3
            AND
                year_month_day = $4;`;
        const params = [
            attendance.workEndTime.value,
            attendance.traineeId.value,
            attendance.traineeId.value,
            attendance.yearMonthDay.value
        ];

        await this.db.begin();
        try {
            await this.db.execute(sql, params);
            await this.db.commit();
            return attendance;
        } catch (e) {
            await this.db.rollback();
            throw e;
        }
        // finally {
        //     await this.db.end();
        // }
    }
}