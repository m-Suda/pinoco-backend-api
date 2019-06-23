import { DailyReportRepository } from "../../interfaces/database/DailyReportRepository";
import { DailyReport } from "../../domain/models/DailyReport";
import { DBOperator } from "../../interfaces/database/DBOperator";

export class EditLearningLevel {

    private readonly dailyReportRepository: DailyReportRepository;

    constructor(dailyReportRepository: DailyReportRepository) {
        this.dailyReportRepository = dailyReportRepository;
    }

    public async execute(dailyReport: DailyReport, operator: DBOperator) {
        try {
            return await this.dailyReportRepository.editLearningLevel(dailyReport, operator);
        } catch (e) {
            throw e;
        }
    }
}