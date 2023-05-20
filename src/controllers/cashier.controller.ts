import { Request, Response } from "express";
import Cashier from "../models/cashier.model";

class CashierController {
    getAllCashiers(req: Request, res: Response): void {
        Cashier.find()
            .then((cashiers) => {
                res.json(cashiers);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    getCashierById(req: Request, res: Response): void {
        const cashierId = req.params.id;

        Cashier.findById(cashierId)
            .then((cashier) => {
                if (!cashier) {
                    res.status(404).json({ error: "Cashier not found" });
                } else {
                    res.json(cashier);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    createCashier(req: Request, res: Response): void {
        const body = req.body;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const email = body.email;
        const admin = body.admin;

        const newCashier = new Cashier({
            firstName,
            lastName,
            email,
            admin,
        });

        newCashier
            .save()
            .then((cashier) => {
                res.status(201).json(cashier);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    updateCashier(req: Request, res: Response): void {
        const cashierId = req.params.id;
        const body = req.body;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const email = body.email;
        const admin = body.admin;

        Cashier.findByIdAndUpdate(cashierId, { firstName, lastName, email, admin }, { new: true })
            .then((cashier) => {
                if (!cashier) {
                    res.status(404).json({ error: "Cashier not found" });
                } else {
                    res.json(cashier);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    deleteCashier(req: Request, res: Response): void {
        const cashierId = req.params.id;

        Cashier.findByIdAndDelete(cashierId)
            .then((cashier) => {
                if (!cashier) {
                    res.status(404).json({ error: "Cashier not found" });
                } else {
                    res.sendStatus(204);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
}

export default new CashierController();
