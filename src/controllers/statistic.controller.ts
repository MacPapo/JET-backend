import { Request, Response } from "express";
import Statistic from "../models/statistic.model";

class StatisticController {
    getAllStatistics(req: Request, res: Response): void {
        Statistic.find()
            .then((statistics) => {
                res.json(statistics);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    getStatisticById(req: Request, res: Response): void {
        const statisticId = req.params.id;

        Statistic.findById(statisticId)
            .then((statistic) => {
                if (!statistic) {
                    res.status(404).json({ error: "Statistic not found" });
                } else {
                    res.json(statistic);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    createStatistic(req: Request, res: Response): void {
        const body = req.body;
        const day = body.day;
        const dishOfTheDay = body.dishOfTheDay;

        const newStatistic = new Statistic({
            day,
            dishOfTheDay
        });

        newStatistic
            .save()
            .then((statistic) => {
                res.status(201).json(statistic);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    updateStatistic(req: Request, res: Response): void {
        const statisticId = req.params.id;
        const body = req.body;
        const day = body.day;
        const dishOfTheDay = body.dishOfTheDay;

        Statistic.findByIdAndUpdate(statisticId, { day, dishOfTheDay }, { new: true })
            .then((statistic) => {
                if (!statistic) {
                    res.status(404).json({ error: "Statistic not found" });
                } else {
                    res.json(statistic);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    deleteStatistic(req: Request, res: Response): void {
        const statisticId = req.params.id;

        Statistic.findByIdAndDelete(statisticId)
            .then((statistic) => {
                if (!statistic) {
                    res.status(404).json({ error: "Statistic not found" });
                } else {
                    res.sendStatus(204);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
}

export default new StatisticController();
