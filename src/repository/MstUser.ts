import { Postgres } from "../database/Postgres";
import { User } from "../models/User";

export class MstUser {

    public static async selectAll() {

        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
            SELECT
                user_id
              , user_name
              , m_user.company_id
              , company_name
              , m_user.role_id
              , role_name
              , m_user.create_user
              , m_user.create_date
              , m_user.update_user
              , m_user.update_date
            FROM
                mst_user m_user
                    LEFT JOIN mst_company m_company
                        ON m_user.company_id = m_company.company_id
                    LEFT JOIN mst_role m_role
                        ON m_user.role_id = m_role.role_id
            ORDER BY 
                   create_date
        `;

        try {
            return await db.executeQuery(sql);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public static async select(userId: string) {

        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
            SELECT
                user_id
              , user_name
              , m_user.company_id
              , company_name
              , m_user.role_id
              , role_name
              , m_user.create_user
              , m_user.create_date
              , m_user.update_user
              , m_user.update_date
            FROM
                mst_user m_user
                LEFT JOIN mst_company m_company
                    ON m_user.company_id = m_company.company_id
                LEFT JOIN mst_role m_role
                    ON m_user.role_id = m_role.role_id
            WHERE 
                user_id = $1
        `;
        const param = [ userId ];

        try {
            return await db.executeQuery(sql, param);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public static async insert(user: User) {

        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
            INSERT INTO mst_user (user_id,
                                  user_name,
                                  company_id,
                                  role_id,
                                  create_date,
                                  create_user,
                                  update_date,
                                  update_user)
            VALUES ($1, $2, $3, $4, to_char(now(), 'YYYYMMDDHH24MISS'), $5, to_char(now(), 'YYYYMMDDHH24MISS'), $6);
        `;
        const params = [
            user.userId,
            user.userName,
            user.companyId,
            user.roleId,
            user.createUser,
            user.createUser,
        ];

        try {
            await db.executeQuery(sql, params);
            return true;
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public static async update(user: User) {

        const db: Postgres = new Postgres();
        await db.connect();

        const sql = `
            UPDATE
                mst_user
            SET
                user_name = $1
              , role_id = $2
              , company_id = $3
              , update_user = $4
              , update_date = to_char(now(), 'YYYYMMDDHH24MISS')
            WHERE
                user_id = $5;
        `;
        const params = [
            user.userName,
            user.roleId,
            user.companyId,
            user.updateUser,
            user.userId
        ];

        try {
            await db.executeQuery(sql, params);
            return true;
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public static async delete(userId: string) {
        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
          DELETE
          FROM mst_user
          WHERE user_id = $1;
        `;

        const param = [ userId ];

        try {
            await db.executeQuery(sql, param);
            return true;
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }
}