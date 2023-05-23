import { Request, Response } from "express";
import Waiter from "../models/waiter.model";
import StatusCode from "../common/utils/status_code";

class WaiterController {
    getAllWaiters(req: Request, res: Response): void {
        Waiter.find()
            .then((waiters) => {
                res.json(waiters);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    getWaiterById(req: Request, res: Response): void {
        const waiterId = req.params.id;

        Waiter.findById(waiterId)
            .then((waiter) => {
                if (!waiter) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Waiter not found" });
                } else {
                    res.json(waiter);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    createWaiter(req: Request, res: Response): void {
        const body = req.body;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const email = body.email;

        const newWaiter = new Waiter({
            firstName,
            lastName,
            email,
        });

        newWaiter
            .save()
            .then((waiter) => {
                res.status(StatusCode.CREATED).json(waiter);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    updateWaiter(req: Request, res: Response): void {
        const waiterId = req.params.id;
        const body = req.body;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const email = body.email;

        Waiter.findByIdAndUpdate(waiterId, { firstName, lastName, email }, { new: true })
            .then((waiter) => {
                if (!waiter) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Waiter not found" });
                } else {
                    res.json(waiter);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    deleteWaiter(req: Request, res: Response): void {
        const waiterId = req.params.id;

        Waiter.findByIdAndDelete(waiterId)
            .then((waiter) => {
                if (!waiter) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Waiter not found" });
                } else {
                    res.sendStatus(StatusCode.NO_CONTENT);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }
}

export default new WaiterController();
