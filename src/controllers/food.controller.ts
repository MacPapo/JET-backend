import { Request, Response } from "express";
import Food from "../models/food.model";
import StatusCode from "../common/utils/status_code";

class FoodController {
    getAllFoods(req: Request, res: Response): void {
        Food.find()
            .then((foods) => {
                res.json(foods);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    getFoodById(req: Request, res: Response): void {
        const foodId = req.params.id;

        Food.findById(foodId)
            .then((food) => {
                if (!food) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Food not found" });
                } else {
                    res.json(food);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    createFood(req: Request, res: Response): void {
        const body = req.body;
        const name = body.name;
        const price = body.price;
        const description = body.description
        const productionTime = body.productionTime;

        const newFood = new Food({
            name,
            price,
            description,
            productionTime,
        });

        newFood
            .save()
            .then((food) => {
                res.status(StatusCode.CREATED).json(food);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    updateFood(req: Request, res: Response): void {
        const foodId = req.params.id;
        const body = req.body;
        const name = body.name;
        const price = body.price;
        const description = body.description
        const productionTime = body.productionTime;

        Food.findByIdAndUpdate(foodId, { name, price, description, productionTime }, { new: true })
            .then((food) => {
                if (!food) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Food not found" });
                } else {
                    res.json(food);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    deleteFood(req: Request, res: Response): void {
        const foodId = req.params.id;

        Food.findByIdAndDelete(foodId)
            .then((food) => {
                if (!food) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Food not found" });
                } else {
                    res.sendStatus(StatusCode.NO_CONTENT);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }
}

export default new FoodController();
