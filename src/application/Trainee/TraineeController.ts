import {Request, Response} from "express";

class TraineeController {

    public async fetch(req: Request, res: Response) {
        try {

        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Trainee Fetch Failed!'
            });
        }
    }

    public async fetchAll(req: Request, res: Response) {
        try {

        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Trainee FetchAll Failed!'
            });
        }
    }

    public async register(req: Request, res: Response) {
        try {

        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Trainee FetchAll Failed!'
            });
        }
    }

    public async modify(req: Request, res: Response) {
        try {

        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Trainee FetchAll Failed!'
            });
        }
    }

    public async delete(req: Request, res: Response) {
        try {

        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Trainee FetchAll Failed!'
            });
        }
    }
}

export const traineeController = new TraineeController();