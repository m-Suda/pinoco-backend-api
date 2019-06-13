import { mstRole } from "../../repository/MstRole";
import { Role } from "../../models/Role";

class RoleService {
    public async fetch(userRole: string) {
        try {
            return await mstRole.select(userRole);
        } catch (e) {
            console.error('【ユーザー権限権限取得(単体)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public async fetchAll() {
        try {
            return await mstRole.selectAll();
        } catch (e) {
            console.error('【ユーザー権限取得(全件)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public async register(role: Role, uid: string) {
        try {
            role.createUser = uid;
            await mstRole.insert(role);
        } catch (e) {
            console.error('【ユーザー権限登録処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public async modify(role: Role, uid: string) {
        try {
            role.updateUser = uid;
            await mstRole.update(role);
        } catch (e) {
            console.error('【ユーザー権限更新処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public async delete(roleId: string) {
        try {
            await mstRole.delete(roleId);
        } catch (e) {
            console.error('【ユーザー権限削除処理でエラー】');
            console.error(e);
            throw e;
        }
    }
}

export const roleService = new RoleService();