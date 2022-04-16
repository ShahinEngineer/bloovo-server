import { Model } from 'mongoose';
import jobModel from '../models/jobModel';
import { Request, Response, Router } from 'express';
import JobService from '../services/jobService';
import moment from 'moment';

class JobController {
    public router = Router();
    public t: Model<any>;

    constructor(private jobService = new JobService()) {
        this.initializeRoutes();
        this.t = this.getSchema();
    }

    protected getSchema() {
        return jobModel;
    }

    protected initializeRoutes() {
        this.router.post('/', this.createJob.bind(this));
        this.router.get('/', this.getAllJob.bind(this));
        this.router.delete('/', this.deleteJob.bind(this));
    }

    async createJob(req: Request, res: Response) {
        try {
            const result = await this.jobService.save(req.body);
            if (result) {
                res.status(200).json({ result });
            }
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }
    async getAllJob(req: Request, res: Response) {
        try {
            const result = await this.jobService.findAll();
            if (result) {
                res.status(200).json({ result });
            }
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

    async deleteJob(req: Request, res: Response) {
        const id = req.body.id;
        try {
            const result = await this.jobService.delete(id);
            if (result) {
                result.deletedCount != 0 ? res.status(202).end() : res.status(400).json('Faild to delete the job');
            }
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }
}

export default JobController;
