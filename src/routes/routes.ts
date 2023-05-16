import { Router } from "express";
import waitersRouter from "./waiter.routes";

const router: Router = Router();

//MAIN ROUTES

router.get("/", (req, res) => {
    res.send("Hello World!");
});

//MODEL ROUTES

router.use("/waiters", waitersRouter);

export default router;
