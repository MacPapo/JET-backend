import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();

// Define and export the configuration object
export const config = {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    apiDbName: process.env.API_DB_NAME,
    dbTestName: process.env.DB_TEST_NAME,
    dbProdName: process.env.DB_PROD_NAME,
};
