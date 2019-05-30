import { Request, Response } from "express";
import { roleService } from "./RoleService";
import { Role } from "../../models/Role";
import { validationResult } from "express-validator/check";
import * as firebase from "../../firebase/firebaes";

export class RoleController {
    public async fetch(req: Request, res: Response) {
        try {
            const result = await roleService.fetch(req.params.roleId);
            res.status(200).send({
                role: result
            });
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Role Fetch Failed!'
            });
        }
    }

    public async fetchAll(req: Request, res: Response) {
        try {
            const result = await roleService.fetchAll();
            res.status(200).send({
                roles: result
            });
        } catch (e) {
            res.status(500).send({
                message: 'Role FetchAll Failed!'
            });
        }
    }

    public async register(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(402).send({
                errors: errors.array()
            });
            return;
        }
        try {
            const uid: string = await firebase.decodeIdToken(req);
            await roleService.register(new Role(req.body), uid);
            res.status(200).send({
                message: 'Insert Success!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Insert Failed!'
            });
        }
    }

    public async modify(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(402).send({
                errors: errors.array()
            });
            return;
        }
        try {
            const uid: string = await firebase.decodeIdToken(req);
            await roleService.modify(new Role(req.body), uid);
            res.status(200).send({
                message: 'Update Success!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Update Failed!'
            });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            await roleService.delete(req.params.roleId);
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

export const roleController = new RoleController();