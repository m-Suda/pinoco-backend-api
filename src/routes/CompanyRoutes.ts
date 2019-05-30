import * as express from 'express';
import * as validator from '../validator/CompanyValidator';
import { companyController } from "../application/Company/CompanyController";

class CompanyRoutes {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/:companyId', (req: express.Request, res: express.Response) => {
            companyController.fetch(req, res);
        });
        this.router.get('/', (req: express.Request, res: express.Response) => {
            companyController.fetchAll(req, res);
        });
        this.router.post('/', validator.bodyParams, (req: express.Request, res: express.Response) => {
            companyController.register(req, res);
        });
        this.router.patch('/', validator.bodyParams, (req: express.Request, res: express.Response) => {
            companyController.modify(req, res);
        });
        this.router.delete('/:companyId', (req: express.Request, res: express.Response) => {
            companyController.delete(req, res);
        });
    }
}

export const companyRoutes = new CompanyRoutes().router;