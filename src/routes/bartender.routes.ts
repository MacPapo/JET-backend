import { Router } from "express";
import BartenderController from "../controllers/bartender.controller";

const router: Router = Router();


// GET /api/waiters
router.get("/", BartenderController.getAllBartenders);

// GET /api/waiters/:id
router.get("/:id", BartenderController.getBartenderById);

// POST /api/waiters
router.post("/", BartenderController.createBartender);

// PUT /api/waiters/:id
router.put("/:id", BartenderController.updateBartender);

// DELETE /api/waiters/:id
router.delete("/:id", BartenderController.deleteBartender);

export default router;
