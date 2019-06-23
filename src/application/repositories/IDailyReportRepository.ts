import { DailyReport } from "../../domain/models/DailyReport";

export abstract class IDailyReportRepository {

    abstract async register(dailyReport: DailyReport): Promise<any>;
    abstract async modify(dailyReport: DailyReport): Promise<any>;
}