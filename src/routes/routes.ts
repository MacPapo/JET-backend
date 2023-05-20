import { Router } from "express";
import waitersRouter from "./waiter.routes";
import redisService from "../common/services/redis.service";

const router: Router = Router();

//MAIN ROUTES

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.get("/redis_test", (req, res) => {
    redisService.set('key', 'funziona');
    const value = redisService.get('key');
    value.then((value: string) => {
        res.send(`Redis test: ${value}`);
    }).catch((err: Error) => {
        res.send(`Redis test: ${err}`);
    });
});

//MODEL ROUTES

router.use("/waiters", waitersRouter);

export default router;
