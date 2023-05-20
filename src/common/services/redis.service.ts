import { createClient } from 'redis';
import { REDIS_URI } from '../config/config';

class RedisService {
    private static instance: RedisService;
    private client: any;
    private uri: string = REDIS_URI;

    private constructor() {
        this.client = createClient({
            url: this.uri
        });
        this.client.on('error', (err: any) => {
            console.log('Error ' + err);
        });
        this.client.on('connect', () => {
            console.log('Redis is connected');
        });
        this.client.connect()
            .then(() => {
                console.log('Redis is connected');
            })
            .catch((err: any) => {
                console.log('Error ' + err);
            });
    }

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    public getClient(): any {
        return this.client;
    }
}

export default RedisService.getInstance().getClient();
