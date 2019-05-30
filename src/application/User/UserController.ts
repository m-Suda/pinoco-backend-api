import { Request, Response } from "express";
import { UserService } from "./UserService";
import { User } from "../../models/User";
import { validationResult } from "express-validator/check";
import * as firebase from '../../firebase/firebaes';

export class UserController {

    public static async fetch(req: Request, res: Response) {
        try {
            const result = await UserService.fetch(req.params.userId);
            res.status(200).send({
                user: result
            });
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'User Fetch Failed!'
            });
        }
    }

    public static async fetchAll(req: Request, res: Response) {
        try {
            const result = await UserService.fetchAll();
            res.status(200).send({
                users: result
            });
        } catch (e) {
            res.status(500).send({
                message: 'User FetchAll Failed!'
            });
        }
    }

    public static async register(req: Request, res: Response) {
        console.log('ユーザー登録開始');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(402).send({
                errors: errors.array()
            });
            return;
        }
        try {
            const uid: string = await firebase.decodeIdToken(req);
            await UserService.register(new User(req.body), uid);
            console.log('ユーザー登録に成功');
            res.status(200).send({
                message: 'Insert Success!'
            });
        } catch (e) {
            console.log(e);
            console.log('ユーザー登録に失敗');
            res.status(500).send({
                message: 'Insert Failed!'
            });
        } finally {
            console.log('ユーザー登録処理終了');
        }
    }

    public static async modify(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(402).send({
                errors: errors.array()
            });
            return;
        }
        try {
            const uid: string = await firebase.decodeIdToken(req);
            await UserService.modify(new User(req.body), uid);
            res.status(200).send({
                message: 'Update Success!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Update Failed!'
            });
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            await UserService.delete(req.params.userId);
            res.status(200).send({
                message: 'Delete Success!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Delete Failed!'
            });
        }
    }
}