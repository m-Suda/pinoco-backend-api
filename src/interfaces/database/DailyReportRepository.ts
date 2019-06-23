import { IDailyReportRepository } from "../../application/repositories/IDailyReportRepository";
import { DailyReport } from "../../domain/models/DailyReport";
import { IDBConnection } from "./IDBConnection";

export class DailyReportRepository extends IDailyReportRepository {

    private db: IDBConnection;

    constructor(db: IDBConnection) {
        super();
        this.db = db;
    }

    public async register(dailyReport: DailyReport): Promise<DailyReport> {
        await this.db.connect();

        const sql = `
            INSERT INTO
                trn_daily_report(
                    trainee_id, year_month_day, daily_report
                  , curriculum_name, understanding_degrees, progress_degrees, feedback_id
                  , create_user, create_date, update_user, update_date                         
                ) VALUES (
                    $1, $2, $3
                  , $4, $5, $6, $7
                  , $8, to_char(now(), 'YYYYMMDDHH24MISS'), $9, to_char(now(), 'YYYYMMDDHH24MISS')
                );`;
        const params = [
            dailyReport.traineeId.value,
            dailyReport.yearMonthDay.value,
            dailyReport.dailyReport.value,
            dailyReport.curriculumName.value,
            dailyReport.understandingDegrees.value,
            dailyReport.progressDegrees.value,
            dailyReport.feedbackId.value,
            dailyReport.traineeId.value,
            dailyReport.traineeId.value,
        ];

        await this.db.begin();
        try {
            await this.db.execute(sql, params);
            await this.db.commit();
            return dailyReport;
        } catch (e) {
            await this.db.rollback();
            throw e;
        }
        // finally {
        //     await this.db.end();
        // }
    }

    public async modify(dailyReport: DailyReport): Promise<DailyReport> {
        return dailyReport;
    }

}