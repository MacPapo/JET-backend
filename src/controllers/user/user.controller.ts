import { Request, Response } from "express";
import  User from "../../models/user/user.model";

class UserController {
  getAllUsers(req: Request, res: Response): void {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  getUserById(req: Request, res: Response): void {
    const userId = req.params.id;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  createUser(req: Request, res: Response): void {
    const { name, email } = req.body;

    const newUser = new User({
      name,
      email,
    });

    newUser
      .save()
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  updateUser(req: Request, res: Response): void {
    const userId = req.params.id;
    const { name, email } = req.body;

    User.findByIdAndUpdate(userId, { name, email }, { new: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  deleteUser(req: Request, res: Response): void {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
}

export default new UserController();
