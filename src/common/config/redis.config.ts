import { config } from './config';
import { createClient } from 'redis';

class RedisManager {
    private static instance: RedisManager;
    private client: any;
    private uri: string = `redis://${config.redisHost}:${config.redisPort}`;

    private constructor() {
        this.client = createClient({
            url: this.uri
        });
        this.client.on('error', (err: any) => {
            console.log('Error ' + err);
        });
        this.client.connect();
    }

    public static getInstance(): RedisManager {
        if (!RedisManager.instance) {
            RedisManager.instance = new RedisManager();
        }
        return RedisManager.instance;
    }

    public getClient(): any {
        return this.client;
    }
}

export default RedisManager.getInstance().getClient();
