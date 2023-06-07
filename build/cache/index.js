"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const redis_1 = require("redis");
const Logger_1 = __importDefault(require("../core/Logger"));
const redisURL = `redis://:${config_1.redis.password}@${config_1.redis.host}:${config_1.redis.port}`;
const client = (0, redis_1.createClient)({ url: redisURL });
client.on('connect', () => Logger_1.default.info('Cache is connecting'));
client.on('ready', () => Logger_1.default.info('Cache is ready'));
client.on('end', () => Logger_1.default.info('Cache disconnected'));
client.on('reconnecting', () => Logger_1.default.info('Cache is reconnecting'));
client.on('error', (e) => Logger_1.default.error(e));
(async () => {
    await client.connect();
})();
// If the Node process ends, close the Cache connection
process.on('SIGINT', async () => {
    await client.disconnect();
});
exports.default = client;
//# sourceMappingURL=index.js.map