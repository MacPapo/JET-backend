import express from 'express';
import waiter from './waiter';
import cooker from './cooker';
import bartender from './bartender';
import shared from './shared';

const router = express.Router();

router.use('/waiter', waiter, shared);
router.use('/cooker', cooker);
router.use('/bartender', bartender);
router.use('/cashier', shared);

export default router;
