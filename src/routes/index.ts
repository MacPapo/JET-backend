import express from 'express';
import apikey from '../auth/apikey';
import permission from '../helpers/permission';
import { Permission } from '../database/model/ApiKey';
import register from './access/register';
import login from './access/login';
import logout from './access/logout';
import token from './access/token';
import credential from './access/credential';
import food from './food';
import drink from './drink';
import table from './table';
import blog from './blog';
import blogs from './blogs';
import profile from './profile';

const router = express.Router();

/*---------------------------------------------------------*/
router.use(apikey);
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
router.use(permission(Permission.GENERAL));
/*---------------------------------------------------------*/
router.use('/register', register);
router.use('/login', login);
router.use('/logout', logout);
router.use('/token', token);
router.use('/credential', credential);
router.use('/food', food);
router.use('/drink', drink);
router.use('/table', table);
// router.use('/profile', profile);
// router.use('/blog', blog);
// router.use('/blogs', blogs);

export default router;
