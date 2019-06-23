import { DailyReport } from "../../domain/models/DailyReport";
import { IDailyReportRepository } from "../repositories/IDailyReportRepository";

export class RegisterDailyReport {

    private readonly dailyReportRepository: IDailyReportRepository;

    constructor(dailyReportRepository: IDailyReportRepository) {
        this.dailyReportRepository = dailyReportRepository;
    }

    public async execute(dailyReport: DailyReport) {
        try {
            const registerDailyReport = await this.dailyReportRepository.register(dailyReport);
            return registerDailyReport;
        } catch (e) {
            throw e;
        }
    }
}