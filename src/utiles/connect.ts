import mongoose from 'mongoose';
import config from 'config';

export default class dbConnect {
    private static _instance: dbConnect;
    private dbrui = config.get<string>('dburi');
    private constructor() {
        mongoose
            .connect(this.dbrui)
            .then(() => console.log('MongoDB connection established successfully'))
            .catch((e: mongoose.Error) => console.log(`MongoDB connection failed with error: ${e}`));
    }
    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new dbConnect();
        return this._instance;
    }
}
