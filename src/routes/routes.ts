import { Router } from "express";
import waitersRouter from "./waiter.routes";
import redisClient from "../common/config/redis.config";

const router: Router = Router();

//MAIN ROUTES

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.get("/redis_test", (req, res) => {
    redisClient.set('key', 'funziona');
    const value = redisClient.get('key');
    value.then((value: string) => {
        res.send(`Redis test: ${value}`);
    }).catch((err: Error) => {
        res.send(`Redis test: ${err}`);
    });
});

//MODEL ROUTES

router.use("/waiters", waitersRouter);

export default router;
