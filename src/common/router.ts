import { Router } from "express";
import UserController from "../controllers/user/user.controller";

const router: Router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

// GET /api/users
router.get("/users", UserController.getAllUsers);

// GET /api/users/:id
router.get("/users/:id", UserController.getUserById);

// POST /api/users
router.post("/users", UserController.createUser);

// PUT /api/users/:id
router.put("/users/:id", UserController.updateUser);

// DELETE /api/users/:id
router.delete("/users/:id", UserController.deleteUser);

export default router;
