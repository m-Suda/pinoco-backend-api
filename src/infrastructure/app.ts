import * as express from 'express';
import * as bodyParser from 'body-parser';
import { attendanceRoutes } from "./routes/AttendanceRoutes";
import * as firebase from './firebase/firebaes';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config() {
        this.app.use(bodyParser.json());
        // SPAからAPIを叩くとCORSに引っかかるので設定
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With ,Content-Type ,Authorization");
            res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
            next();
        });

        // カスタムヘッダーがあるとプリフライトリクエストとなりOPTIONSメソッドが先に処理される。
        this.app.options('*', (req, res) => {
            res.sendStatus(200);
        });

        this.app.use((req, res, next) => {
            firebase.verifyIdToken(req, res, next);
        });

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/attendance', attendanceRoutes);

        this.app.use((err, req, res, next) => {
            res.status(err.status).send({ message: err.message });
        });
    }

}

export default new App().app;