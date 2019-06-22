import { mstUser } from "../../repository/MstUser";
import { User } from "../../models/User";
import * as firebase from '../../firebase/firebaes';

export class UserService {

    public static async fetch(userId: string) {
        try {
            return await mstUser.select(userId);
        } catch (e) {
            console.error('【ユーザー取得(単体)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async fetchAll() {
        try {
            return await mstUser.selectAll();
        } catch (e) {
            console.error('【ユーザー取得(全件)処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async register(user: User, uid: string) {
        try {
            user.createUser = uid;
            user.updateUser = uid;
            await mstUser.insert(user);
        } catch (e) {
            console.error('【ユーザー登録処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async modify(user: User, uid: string) {
        try {
            user.updateUser = uid;
            await mstUser.update(user);
        } catch (e) {
            console.error('【ユーザー更新処理でエラー】');
            console.error(e);
            throw e;
        }
    }

    public static async delete(userId: string) {
        try {
            await firebase.deleteUser(userId);
            await mstUser.delete(userId);
        } catch (e) {
            console.error('【ユーザー削除処理でエラー】');
            console.error(e);
            throw e;
        }
    }
}