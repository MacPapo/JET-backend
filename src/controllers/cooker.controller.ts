import { Request, Response } from "express";
import Cooker from "../models/cooker.model";

class CookerController {
    getAllCookers(req: Request, res: Response): void {
        Cooker.find()
            .then((cookers) => {
                res.json(cookers);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    getCookerById(req: Request, res: Response): void {
        const cookerId = req.params.id;

        Cooker.findById(cookerId)
            .then((cooker) => {
                if (!cooker) {
                    res.status(404).json({ error: "Cooker not found" });
                } else {
                    res.json(cooker);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    createCooker(req: Request, res: Response): void {
        const body = req.body;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const email = body.email;

        const newCooker = new Cooker({
            firstName,
            lastName,
            email,
        });

        newCooker
            .save()
            .then((cooker) => {
                res.status(201).json(cooker);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    updateCooker(req: Request, res: Response): void {
        const cookerId = req.params.id;
        const body = req.body;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const email = body.email;

        Cooker.findByIdAndUpdate(cookerId, { firstName, lastName, email }, { new: true })
            .then((cooker) => {
                if (!cooker) {
                    res.status(404).json({ error: "Cooker not found" });
                } else {
                    res.json(cooker);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    deleteCooker(req: Request, res: Response): void {
        const cookerId = req.params.id;

        Cooker.findByIdAndDelete(cookerId)
            .then((cooker) => {
                if (!cooker) {
                    res.status(404).json({ error: "Cooker not found" });
                } else {
                    res.sendStatus(204);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
}

export default new CookerController();
