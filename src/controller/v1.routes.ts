import { Router } from 'express';
import JobController from './jobController';

class ViRoutes {
    public router = Router();

    constructor() {
      this.initilizeRoutes();
    }

    public initilizeRoutes(){
        const jobController = new JobController();

        this.router.use('/job', jobController.router);
    }
}
export default ViRoutes;