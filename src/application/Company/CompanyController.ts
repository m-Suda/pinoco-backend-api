import { Request, Response } from "express";
import { companyService } from "./CompanyService";
import { Company } from "../../models/Company";
import { validationResult } from "express-validator/check";
import * as firebase from "../../firebase/firebaes";

export class CompanyController {

    public async fetch(req: Request, res: Response) {
        try {
            const result = await companyService.fetch(req.params.companyId);
            res.status(200).send({
                company: result
            });
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'User Fetch Failed!'
            });
        }
    }

    public async fetchAll(req: Request, res: Response) {
        try {
            const result = await companyService.fetchAll();
            res.status(200).send({
                companies: result
            });
        } catch (e) {
            res.status(500).send({
                message: 'User FetchAll Failed!'
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
            await companyService.register(new Company(req.body), uid);
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
            await companyService.modify(new Company(req.body), uid);
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
        await companyService.delete(req.params.companyId)
            .catch(e => {
                res.status(500).send({
                    message: 'Delete Failed!'
                });
                return;
            });
        res.status(200).send({
            message: 'Delete Success!'
        });
    }
}

export const companyController = new CompanyController();