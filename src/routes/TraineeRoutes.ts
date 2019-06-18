import * as express from 'express';

class TraineeRoutes {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', (req:express.Request, res: express.Response) => {});
        this.router.get('/:traineeId', (req:express.Request, res: express.Response) => {});
        this.router.post('/', (req:express.Request, res: express.Response) => {});
        this.router.patch('/', (req:express.Request, res: express.Response) => {});
        this.router.delete('/:traineeId', (req:express.Request, res: express.Response) => {});
    }
}

export const traineeRoutes = new TraineeRoutes().router;