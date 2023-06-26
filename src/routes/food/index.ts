import express from 'express';
import admin from './admin';
import shared from './shared';

const router = express.Router();

router.use('/', shared);
router.use('/', admin);

export default router;
