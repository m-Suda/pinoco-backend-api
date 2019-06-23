import { DailyReport } from "../../domain/models/DailyReport";
import { DBOperator } from "../../interfaces/database/DBOperator";

export abstract class IDailyReportRepository {

    abstract async register(dailyReport: DailyReport): Promise<any>;
    abstract async modify(dailyReport: DailyReport, operator: DBOperator): Promise<any>;
    abstract async editLearningLevel(dailyReport: DailyReport, operator: DBOperator): Promise<any>;
}