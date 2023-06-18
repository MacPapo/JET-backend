import express from 'express';
import waiter from './waiter';
import waiterOrCashier from './waiterOrCashier';
import shared from './shared';

const router = express.Router();

router.use('/', shared);
router.use('/', waiterOrCashier);
router.use('/', waiter);

export default router;
