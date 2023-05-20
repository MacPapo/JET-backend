import { Router } from "express";
import FoodController from "../controllers/food.controller";

const router: Router = Router();


// GET /api/waiters
router.get("/", FoodController.getAllFoods);

// GET /api/waiters/:id
router.get("/:id", FoodController.getFoodById);

// POST /api/waiters
router.post("/", FoodController.createFood);

// PUT /api/waiters/:id
router.put("/:id", FoodController.updateFood);

// DELETE /api/waiters/:id
router.delete("/:id", FoodController.deleteFood);

export default router;
