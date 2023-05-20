import { Router } from "express";
import CashierController from "../controllers/cashier.controller";

const router: Router = Router();


// GET /api/waiters
router.get("/", CashierController.getAllCashiers);

// GET /api/waiters/:id
router.get("/:id", CashierController.getCashierById);

// POST /api/waiters
router.post("/", CashierController.createCashier);

// PUT /api/waiters/:id
router.put("/:id", CashierController.updateCashier);

// DELETE /api/waiters/:id
router.delete("/:id", CashierController.deleteCashier);

export default router;
