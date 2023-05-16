import { Router } from "express";
import WaiterController from "../controllers/waiter.controller";

const router: Router = Router();


// GET /api/waiters
router.get("/", WaiterController.getAllWaiters);

// GET /api/waiters/:id
router.get("/:id", WaiterController.getWaiterById);

// POST /api/waiters
router.post("/", WaiterController.createWaiter);

// PUT /api/waiters/:id
router.put("/:id", WaiterController.updateWaiter);

// DELETE /api/waiters/:id
router.delete("/:id", WaiterController.deleteWaiter);

export default router;
