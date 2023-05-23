import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/config';

class MongooseService {
    private static instance: MongooseService;
    private count = 0;
    private uri: string = MONGODB_URI;
    // private mongooseOptions = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     serverSelectionTimeoutMS: 5000,
    //     useFindAndModify: false,
    // };

    private constructor() {
        this.connectWithRetry();
    }

    public static getInstance() {
        if (!MongooseService.instance) {
            MongooseService.instance = new MongooseService();
        }
        return MongooseService.instance;
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

export default MongooseService.getInstance();
