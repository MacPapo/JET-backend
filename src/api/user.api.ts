const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
const UserController = require('../models/user/user.model');

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send('The sedulous hyena ate the antelope!');
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await UserController.getUsers();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
