import { Postgres } from "../database/Postgres";
import { Role } from "../models/Role";

class MstRole {

    public async selectAll() {

        const db: Postgres = new Postgres();
        await db.connect();

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
            return await db.executeQuery(sql);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public async select(userRole: string) {

        const db: Postgres = new Postgres();
        await db.connect();

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
            return await db.executeQuery(sql, param);
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public async insert(role: Role) {

        const db: Postgres = new Postgres();
        await db.connect();

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
            await db.executeQuery(sql, param);
            return true;
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public async update(role: Role) {

        const db: Postgres = new Postgres();
        await db.connect();

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
            await db.executeQuery(sql, params);
            return true;
        } catch (e) {
            throw new Error(e);
        } finally {
            await db.end();
        }
    }

    public async delete(roleId: string) {
        const db: Postgres = new Postgres();
        await db.connect();

        const sql = `
            DELETE FROM 
                mst_role
            WHERE
                role_id = $1;
        `;
        const param = [ roleId ];

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

export const mstUserRole = new MstRole();