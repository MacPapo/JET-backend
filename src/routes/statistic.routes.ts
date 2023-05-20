import { Router } from "express";
import StatisticController from "../controllers/statistic.controller";

const router: Router = Router();


// GET /api/waiters
router.get("/", StatisticController.getAllStatistics);

// GET /api/waiters/:id
router.get("/:id", StatisticController.getStatisticById);

// POST /api/waiters
router.post("/", StatisticController.createStatistic);

// PUT /api/waiters/:id
router.put("/:id", StatisticController.updateStatistic);

// DELETE /api/waiters/:id
router.delete("/:id", StatisticController.deleteStatistic);

export default router;
