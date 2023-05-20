import { Request, Response } from "express";
import Cashier from "../models/cashier.model";
import StatusCode from "../common/utils/status_code";

class CashierController {
    getAllCashiers(req: Request, res: Response): void {
        Cashier.find()
            .then((cashiers) => {
                res.json(cashiers);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    getCashierById(req: Request, res: Response): void {
        const cashierId = req.params.id;

        Cashier.findById(cashierId)
            .then((cashier) => {
                if (!cashier) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Cashier not found" });
                } else {
                    res.json(cashier);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
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
                res.status(StatusCode.CREATED).json(cashier);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
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
                    res.status(StatusCode.NOT_FOUND).json({ error: "Cashier not found" });
                } else {
                    res.json(cashier);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    deleteCashier(req: Request, res: Response): void {
        const cashierId = req.params.id;

        Cashier.findByIdAndDelete(cashierId)
            .then((cashier) => {
                if (!cashier) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Cashier not found" });
                } else {
                    res.sendStatus(StatusCode.NO_CONTENT);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }
}

export default new CashierController();
