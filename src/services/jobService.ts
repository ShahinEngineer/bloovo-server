import { jobDocument } from 'models';
import jobModel from '../models/jobModel';
import mongodb from 'mongodb';

interface IJonService {
    findAll(): Promise<jobDocument[]>;
    findById(id: string): Promise<jobDocument | null>;
    save(jobDocument: jobDocument): Promise<jobDocument | null>;
    delete(id: string): Promise<mongodb.DeleteResult>;
}

class JobService implements IJonService {
    async findAll(page = 0, limit = 10): Promise<jobDocument[]> {
        return await jobModel.find({}, {}, { skip: limit * page, limit });
    }

    async findById(id: string): Promise<jobDocument | null> {
        return await jobModel.findById(id);
    }

    async save(jobDocument: jobDocument): Promise<jobDocument | null> {
        return await jobModel.create(jobDocument);
    }

    async delete(id: string): Promise<mongodb.DeleteResult> {
        return await jobModel.deleteOne({ _id: id });
    }
}

export default JobService;
