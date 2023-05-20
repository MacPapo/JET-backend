import { Router } from "express";
import redisClient from "../common/config/redis.config";

import waitersRouter from "./waiter.routes";
import cashierRouter from "./cashier.routes";
import bartenderRouter from "./bartender.routes";
import cookerRouter from "./cooker.routes";
import foodRouter from "./food.routes";
import drinkRouter from "./drink.routes";
import tableRouter from "./table.routes";
import orderRouter from "./order.routes";
import statisticRouter from "./statistic.routes";

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
router.use("/cashiers", cashierRouter);
router.use("/bartenders", bartenderRouter);
router.use("/cookers", cookerRouter);
router.use("/foods", foodRouter);
router.use("/drinks", drinkRouter);
router.use("/tables", tableRouter);
router.use("/orders", orderRouter);
router.use("/statistics", statisticRouter);

export default router;
