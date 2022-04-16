import express from 'express';
import dbConnect from './utiles/connect';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ViRoutes from './controller/v1.routes';
import { urlencoded } from 'body-parser';

class App {

    public app:express.Application;
    public port:number;

    constructor(port:number) {
        this.app = express();
        this.port = port;

        this.initAppUsage();
    }

    private initAppUsage() {
        this.initializeMiddleWare();
        this.initializeRoutes()
    }

    private initializeMiddleWare() {
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(cookieParser());
        dbConnect.getInstance()
    }

    private initializeRoutes() {
        const apiRoutes = new ViRoutes();
        this.app.use('/api', apiRoutes.router);
    }

    public listen(){
        this.app.listen(this.port, '0.0.0.0',async () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;