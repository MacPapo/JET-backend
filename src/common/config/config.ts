import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();


export const APP_PORT = process.env["APP_PORT"];

if (!APP_PORT) {
    console.log("No port number specified. Set APP_PORT environment variable.");
    process.exit(1);
}

export const MONGODB_URI =
    `mongodb://${ process.env["DB_HOST"] }:${ process.env["DB_PORT"] }/${ process.env["API_DB_NAME"] }`;

if (!MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}

export const REDIS_URI =
    `redis://${ process.env["REDIS_HOST"] }:${ process.env["REDIS_PORT"] }`;

if (!REDIS_URI) {
    console.log("No redis connection string. Set REDIS_URI environment variable.");
    process.exit(1);
}

export const JWT_SECRET = process.env["JWT_SECRET"];

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
