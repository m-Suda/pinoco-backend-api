import { mstCompany } from "../../repository/MstCompany";
import { Company } from "../../models/Company";

class CompanyService {

    public async fetch(companyId: string) {
        try {
            return await mstCompany.select(companyId);
        } catch (e) {
            console.error('【企業取得(単体)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public async fetchAll() {
        try {
            return await mstCompany.selectAll();
        } catch (e) {
            console.error('【企業取得(全件)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public async register(company: Company, uid) {
        try {
            company.createUser = uid;
            company.updateUser = uid;
            await mstCompany.insert(company);
        } catch (e) {
            console.error('【企業登録処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public async modify(company: Company, uid: string) {
        try {
            company.updateUser = uid;
            await mstCompany.update(company);
        } catch (e) {
            console.error('【企業更新処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public async delete(companyId: string) {
        await mstCompany.delete(companyId)
            .catch(e => {
                console.error('【企業削除処理でエラー】');
                console.error(e);
                throw e;
            });
    }
}

export const companyService = new CompanyService();