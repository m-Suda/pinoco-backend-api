import { Request, Response } from "express";
import {feedbackService} from "./FeedbackService";
import { RequestBodyFeedback } from "../../models/RequestBodyFeedback";
import * as firebase from "../../firebase/firebaes";
import { validationResult } from "express-validator/check";

class FeedbackController {

    /**
     *
     * @param req
     * @param res
     */
    public async fetch(req: Request, res: Response) {
        try {
            return await feedbackService.select(req.params.userId, req.params.feedbackId);
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Feedback Fetch Failed!'
            });
        }
    }

    /**
     *
     * @param req
     * @param res
     */
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
            return await feedbackService.insert(req.body as RequestBodyFeedback, uid);
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Feedback Insert Failed!'
            });
        }
    }

    /**
     *
     * @param req
     * @param res
     */
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
            return await feedbackService.update(req.body as RequestBodyFeedback, uid);
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Feedback Update Failed!'
            });
        }
    }
}

export const feedbackController = new FeedbackController();