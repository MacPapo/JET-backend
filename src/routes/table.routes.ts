import { Router } from "express";
import TableController from "../controllers/table.controller";

const router: Router = Router();


// GET /api/waiters
router.get("/", TableController.getAllTables);

// GET /api/waiters/:id
router.get("/:id", TableController.getTableById);

// POST /api/waiters
router.post("/", TableController.createTable);

// PUT /api/waiters/:id
router.put("/:id", TableController.updateTable);

// DELETE /api/waiters/:id
router.delete("/:id", TableController.deleteTable);

export default router;
