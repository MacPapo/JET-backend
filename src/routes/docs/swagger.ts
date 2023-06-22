import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API',
        },
    },
    apis: ['src/routes/**/*.ts'],
};

const swagger = swaggerJsdoc(options);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swagger));

router.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger);
});

// Serve the Swagger UI documentation without API key and permission middleware
export default router;
