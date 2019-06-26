/**
 * フィードバック登録ユースケース
 * @class RegisterFeedback
 * @classdesc インストラクターが研修生のフィードバックを登録するユースケースクラス
 * @author m-Suda
 */
import { IFeedbackRepository } from "../repositories/IFeedbackRepository";
import { Feedback } from "../../domain/models/Feedback";
import { DBOperator } from "../../interfaces/database/DBOperator";

export class RegisterFeedback {

    /**
     * フィードバックリポジトリ
     * @description フィードバックの永続化を担う
     */
    private readonly feedbackRepository: IFeedbackRepository;

    /**
     * @description リポジトリをDIする。
     * @param feedbackRepository
     */
    constructor(feedbackRepository: IFeedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    /**
     * ユースケース実行
     * @description フィードバックを登録する。
     * @param {Feedback} feedback
     * @param {DBOperator} operator
     * @return {Promise<Feedback>}
     */
    public async execute(feedback: Feedback, operator: DBOperator): Promise<Feedback> {
        try {
            return await this.feedbackRepository.register(feedback, operator);
        } catch (e) {
            throw e;
        }
    }
}