import { Router } from "express";
import OrderController from "../controllers/order.controller";

const router: Router = Router();


// GET /api/waiters
router.get("/", OrderController.getAllOrders);

// GET /api/waiters/:id
router.get("/:id", OrderController.getOrderById);

// POST /api/waiters
router.post("/", OrderController.createOrder);

// PUT /api/waiters/:id
router.put("/:id", OrderController.updateOrder);

// DELETE /api/waiters/:id
router.delete("/:id", OrderController.deleteOrder);

export default router;
