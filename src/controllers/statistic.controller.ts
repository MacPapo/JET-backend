import { Request, Response } from "express";
import Statistic from "../models/statistic.model";
import StatusCode from "../common/utils/status_code";

class StatisticController {
    getAllStatistics(req: Request, res: Response): void {
        Statistic.find()
            .then((statistics) => {
                res.json(statistics);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    getStatisticById(req: Request, res: Response): void {
        const statisticId = req.params.id;

        Statistic.findById(statisticId)
            .then((statistic) => {
                if (!statistic) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Statistic not found" });
                } else {
                    res.json(statistic);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
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
                res.status(StatusCode.CREATED).json(statistic);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
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
                    res.status(StatusCode.NOT_FOUND).json({ error: "Statistic not found" });
                } else {
                    res.json(statistic);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    deleteStatistic(req: Request, res: Response): void {
        const statisticId = req.params.id;

        Statistic.findByIdAndDelete(statisticId)
            .then((statistic) => {
                if (!statistic) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Statistic not found" });
                } else {
                    res.sendStatus(StatusCode.NO_CONTENT);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }
}

export default new StatisticController();
