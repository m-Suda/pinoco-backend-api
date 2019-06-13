import { Postgres } from "../database/Postgres";
import { Role } from "../models/Role";

class MstRole {

    private DB: Postgres;
    
    constructor() {
        this.DB = Postgres.instance;
    }
    
    public async selectAll() {

        await this.DB.connect();

        const sql: string = `
          SELECT role_id,
                 role_name,
                 create_user,
                 create_date,
                 update_user,
                 update_date
          FROM mst_role;
        `;

        try {
            return await this.DB.execute(sql);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async select(userRole: string) {

        await this.DB.connect();

        const sql: string = `
          SELECT role_id,
                 role_name,
                 create_user,
                 create_date,
                 update_user,
                 update_date
          FROM mst_role
          WHERE role_id = $1;
        `;

        const param = [ userRole ];

        try {
            return await this.DB.execute(sql, param);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async insert(role: Role) {

        await this.DB.connect();

        const sql: string = `
          INSERT INTO mst_role (
                                role_id,
                                role_name,
                                create_user,
                                create_date,
                                update_user,
                                update_date)
          VALUES ($1,
                  $2,
                  $3,
                  to_char(now(), 'YYYYMMDDHH24MISS'),
                  $4,
                  to_char(now(), 'YYYYMMDDHH24MISS'));
        `;
        const param = [
            role.roleId,
            role.roleName,
            role.createUser,
            role.createUser,
        ];

        try {
            await this.DB.execute(sql, param);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async update(role: Role) {

        await this.DB.connect();

        const sql = `
            UPDATE 
                mst_role
            SET
                role_name = $1
              , update_user = $2
              , update_date = to_char(now(), 'YYYYMMDDHH24MISS')
            WHERE
                role_id = $3;
        `;
        const params = [
            role.roleName,
            role.updateUser,
            role.roleId
        ];

        try {
            await this.DB.execute(sql, params);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async delete(roleId: string) {

        await this.DB.connect();

        const sql = `
            DELETE FROM 
                mst_role
            WHERE
                role_id = $1;
        `;
        const param = [ roleId ];

        try {
            await this.DB.execute(sql, param);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

}

export const mstRole = new MstRole();