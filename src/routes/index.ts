import express from 'express';
import apikey from '../auth/apikey';
import permission from '../helpers/permission';
import { Permission } from '../database/model/ApiKey';

import auth from './access/auth';
import food from './food';
import drink from './drink';
import table from './table';
import order from './orders';
import bill from './bill';

const router = express.Router();

/*---------------------------------------------------------*/
router.use(apikey);
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
router.use(permission(Permission.GENERAL));
/*---------------------------------------------------------*/

router.use('/auth', auth);
router.use('/foods', food);
router.use('/drinks', drink);
router.use('/tables', table);
router.use('/orders', order);
router.use('/bills', bill);

export default router;
