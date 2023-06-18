import express from 'express';
import waiter from './waiter';
import cooker from './cooker';
import bartender from './bartender';
import shared from './shared';
import status from './status';

const router = express.Router();

router.use('/waiter', waiter, shared);
router.use('/cooker', cooker, status);
router.use('/bartender', bartender, status);
router.use('/cashier', shared);

export default router;
