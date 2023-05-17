import { config } from './config';
import mongoose from 'mongoose';

class MongooseService {
    private count = 0;
    private uri: string = `mongodb://${config.dbHost}:${config.dbPort}/${config.apiDbName}`;
    // private mongooseOptions = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     serverSelectionTimeoutMS: 5000,
    //     useFindAndModify: false,
    // };

    constructor() {
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        console.log('Attempting MongoDB connection (will retry if needed)');
        mongoose
            .connect(this.uri)
            // , this.mongooseOptions as any)
            .then(() => {
                console.log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;
                console.log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err
                );
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    };
}

export default new MongooseService();
