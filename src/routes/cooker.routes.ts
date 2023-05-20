import { Router } from "express";
import CookerController from "../controllers/cooker.controller";

const router: Router = Router();


// GET /api/waiters
router.get("/", CookerController.getAllCookers);

// GET /api/waiters/:id
router.get("/:id", CookerController.getCookerById);

// POST /api/waiters
router.post("/", CookerController.createCooker);

// PUT /api/waiters/:id
router.put("/:id", CookerController.updateCooker);

// DELETE /api/waiters/:id
router.delete("/:id", CookerController.deleteCooker);

export default router;
