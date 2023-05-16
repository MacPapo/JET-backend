import { Request, Response } from "express";
import Waiter from "../models/waiter.model";

class WaiterController {
    getAllWaiters(req: Request, res: Response): void {
        Waiter.find()
            .then((waiters) => {
                res.json(waiters);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    getWaiterById(req: Request, res: Response): void {
        const waiterId = req.params.id;

        Waiter.findById(waiterId)
            .then((waiter) => {
                if (!waiter) {
                    res.status(404).json({ error: "Waiter not found" });
                } else {
                    res.json(waiter);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    createWaiter(req: Request, res: Response): void {
        const body = req.body;
        const first_name = body.first_name;
        const last_name = body.last_name;
        const email = body.email;

        const newWaiter = new Waiter({
            first_name,
            last_name,
            email,
        });

        newWaiter
            .save()
            .then((waiter) => {
                res.status(201).json(waiter);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    updateWaiter(req: Request, res: Response): void {
        const waiterId = req.params.id;
        const body = req.body;
        const first_name = body.first_name;
        const last_name = body.last_name;
        const email = body.email;

        Waiter.findByIdAndUpdate(waiterId, { first_name, last_name, email }, { new: true })
            .then((waiter) => {
                if (!waiter) {
                    res.status(404).json({ error: "Waiter not found" });
                } else {
                    res.json(waiter);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    deleteWaiter(req: Request, res: Response): void {
        const waiterId = req.params.id;

        Waiter.findByIdAndDelete(waiterId)
            .then((waiter) => {
                if (!waiter) {
                    res.status(404).json({ error: "Waiter not found" });
                } else {
                    res.sendStatus(204);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
}

export default new WaiterController();
