import { Postgres } from "../database/Postgres";
import { Company } from "../models/Company";

class MstCompany {

    private DB: Postgres;

    constructor() {
        this.DB = Postgres.instance;
    }

    public async selectAll() {

        await this.DB.connect();

        const sql: string = `
            SELECT 
                company_id,
                company_name,
                create_user,
                create_date,
                update_user,
                update_date
            FROM
                mst_company
            ORDER BY
                create_date
        `;

        try {
            return await this.DB.execute(sql);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async select(companyId: string) {

        await this.DB.connect();

        const sql: string = `
            SELECT
                company_id,
                company_name,
                create_date,
                create_user,
                update_date,
                update_user
            FROM 
                mst_company
            WHERE
                company_id = $1
        `;
        const param = [ companyId ];

        try {
            return await this.DB.execute(sql, param);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async insert(company: Company) {

        await this.DB.connect();

        const sql: string = `
          INSERT INTO mst_company (company_id, company_name, create_date, create_user, update_date, update_user)
          VALUES ($1, $2, to_char(now(), 'YYYYMMDDHH24MISS'), $3, to_char(now(), 'YYYYMMDDHH24MISS'), $4);
        `;
        const param = [
            company.companyId,
            company.companyName,
            company.createUser,
            company.createUser,
        ];

        try {
            await this.DB.execute(sql, param);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async update(company: Company) {

        await this.DB.connect();

        const sql = `
            UPDATE
                mst_company
            SET
                company_name = $1
              , update_user = $2
              , update_date = to_char(now(), 'YYYYMMDDHH24MISS')
            WHERE
                company_id = $3
        `;
        const params = [
            company.companyName,
            company.updateUser,
            company.companyId
        ];
        try {
            await this.DB.execute(sql, params);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async delete(companyId: string) {

        await this.DB.connect();

        const sql = `
            DELETE FROM
                mst_company
            WHERE
                company_id = $1;
        `;
        const param = [ companyId ];
        try {
            await this.DB.execute(sql, param);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

}

export const mstCompany = new MstCompany();