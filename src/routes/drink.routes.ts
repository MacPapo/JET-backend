import { Router } from "express";
import DrinkController from "../controllers/drink.controller";

const router: Router = Router();


// GET /api/waiters
router.get("/", DrinkController.getAllDrinks);

// GET /api/waiters/:id
router.get("/:id", DrinkController.getDrinkById);

// POST /api/waiters
router.post("/", DrinkController.createDrink);

// PUT /api/waiters/:id
router.put("/:id", DrinkController.updateDrink);

// DELETE /api/waiters/:id
router.delete("/:id", DrinkController.deleteDrink);

export default router;
