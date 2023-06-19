import express from 'express';
import cashier from './cashier';

const router = express.Router();

router.use('/', cashier);

export default router;
