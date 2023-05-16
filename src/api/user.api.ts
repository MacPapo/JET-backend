import { Request, Response, Router } from 'express';
import userController from '../controller/user/user.controller';
const router = Router();

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send('The sedulous hyena ate the antelope!');
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = userController.getAllUsers(req, res);
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

export default router;
