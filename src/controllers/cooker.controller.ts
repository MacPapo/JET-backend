import { Request, Response } from "express";
import Cooker from "../models/cooker.model";
import StatusCode from "../common/utils/status_code";

class CookerController {
    getAllCookers(req: Request, res: Response): void {
        Cooker.find()
            .then((cookers) => {
                res.json(cookers);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    getCookerById(req: Request, res: Response): void {
        const cookerId = req.params.id;

        Cooker.findById(cookerId)
            .then((cooker) => {
                if (!cooker) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Cooker not found" });
                } else {
                    res.json(cooker);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
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
                res.status(StatusCode.CREATED).json(cooker);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
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
                    res.status(StatusCode.NOT_FOUND).json({ error: "Cooker not found" });
                } else {
                    res.json(cooker);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    deleteCooker(req: Request, res: Response): void {
        const cookerId = req.params.id;

        Cooker.findByIdAndDelete(cookerId)
            .then((cooker) => {
                if (!cooker) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Cooker not found" });
                } else {
                    res.sendStatus(StatusCode.NO_CONTENT);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }
}

export default new CookerController();
