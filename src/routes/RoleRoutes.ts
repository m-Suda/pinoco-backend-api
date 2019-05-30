import * as express from 'express';
import { roleController } from "../application/Role/RoleController";
import * as validator from '../validator/RoleValidator';

class RoleRoutes {

    public router: express.Router = express.Router();

    constructor() {

        this.config();
    }

    private config(): void {
        this.router.get('/:roleId', (req: express.Request, res: express.Response) => {
            roleController.fetch(req, res);
        });
        this.router.get('/', (req: express.Request, res: express.Response) => {
            roleController.fetchAll(req, res);
        });
        this.router.post('/', validator.bodyParams, (req: express.Request, res: express.Response) => {
            roleController.register(req, res);
        });
        this.router.patch('/', validator.bodyParams, (req: express.Request, res: express.Response) => {
            roleController.modify(req, res);
        });
        this.router.delete('/:roleId', (req: express.Request, res: express.Response) => {
            roleController.delete(req, res);
        });
    }
}

export const roleRoutes = new RoleRoutes().router;