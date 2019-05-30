import * as express from 'express';
import { UserController } from '../application/User/UserController';
import * as validator from '../validator/UserValidator';

class UserRoutes {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/:userId', (req: express.Request, res: express.Response) => {
            UserController.fetch(req, res);
        });
        this.router.get('/', (req: express.Request, res: express.Response) => {
            UserController.fetchAll(req, res);
        });
        this.router.post('/', validator.bodyParams, (req: express.Request, res: express.Response) => {
            UserController.register(req, res);
        });
        this.router.patch('/', validator.bodyParams, (req: express.Request, res: express.Response) => {
            UserController.modify(req, res);
        });
        this.router.delete('/:userId', (req: express.Request, res: express.Response) => {
            UserController.delete(req, res);
        });
    }
}

export const userRoutes = new UserRoutes().router;