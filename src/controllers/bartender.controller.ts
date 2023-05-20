import { Request, Response } from "express";
import Bartender from "../models/bartender.model";

class BartenderController {
    getAllBartenders(req: Request, res: Response): void {
        Bartender.find()
            .then((bartenders) => {
                res.json(bartenders);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    getBartenderById(req: Request, res: Response): void {
        const bartenderId = req.params.id;

        Bartender.findById(bartenderId)
            .then((bartender) => {
                if (!bartender) {
                    res.status(404).json({ error: "Bartender not found" });
                } else {
                    res.json(bartender);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    createBartender(req: Request, res: Response): void {
        const body = req.body;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const email = body.email;

        const newBartender = new Bartender({
            firstName,
            lastName,
            email,
        });

        newBartender
            .save()
            .then((bartender) => {
                res.status(201).json(bartender);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    updateBartender(req: Request, res: Response): void {
        const bartenderId = req.params.id;
        const body = req.body;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const email = body.email;

        Bartender.findByIdAndUpdate(bartenderId, { firstName, lastName, email }, { new: true })
            .then((bartender) => {
                if (!bartender) {
                    res.status(404).json({ error: "Bartender not found" });
                } else {
                    res.json(bartender);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    deleteBartender(req: Request, res: Response): void {
        const bartenderId = req.params.id;

        Bartender.findByIdAndDelete(bartenderId)
            .then((bartender) => {
                if (!bartender) {
                    res.status(404).json({ error: "Bartender not found" });
                } else {
                    res.sendStatus(204);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
}

export default new BartenderController();
