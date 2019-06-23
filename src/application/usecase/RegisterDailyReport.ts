import { DailyReport } from "../../domain/models/DailyReport";
import { IDailyReportRepository } from "../repositories/IDailyReportRepository";

export class RegisterDailyReport {

    private readonly dailyReportRepository: IDailyReportRepository;

    constructor(dailyReportRepository: IDailyReportRepository) {
        this.dailyReportRepository = dailyReportRepository;
    }

    public async execute(dailyReport: DailyReport) {
        try {
            return await this.dailyReportRepository.register(dailyReport);
        } catch (e) {
            throw e;
        }
    }
}