import express from 'express';

import register from './register';
import login from './login';
import logout from './logout';
import token from './token';
import del from './delete';

import credential from './credential';

const router = express.Router();

router.use('/register', register);
router.use('/login', login);
router.use('/logout', logout);
router.use('/token', token);

// TODO
router.use('/delete', del);
//router.use('/credential', credential);

export default router;
