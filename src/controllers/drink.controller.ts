import { Request, Response } from "express";
import Drink from "../models/drink.model";

class DrinkController {
    getAllDrinks(req: Request, res: Response): void {
        Drink.find()
            .then((drinks) => {
                res.json(drinks);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    getDrinkById(req: Request, res: Response): void {
        const drinkId = req.params.id;

        Drink.findById(drinkId)
            .then((drink) => {
                if (!drink) {
                    res.status(404).json({ error: "Drink not found" });
                } else {
                    res.json(drink);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    createDrink(req: Request, res: Response): void {
        const body = req.body;
        const name = body.name;
        const price = body.price;
        const description = body.description
        const productionTime = body.productionTime;

        const newDrink = new Drink({
            name,
            price,
            description,
            productionTime
        });

        newDrink
            .save()
            .then((drink) => {
                res.status(201).json(drink);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    updateDrink(req: Request, res: Response): void {
        const drinkId = req.params.id;
        const body = req.body;
        const name = body.name;
        const price = body.price;
        const description = body.description
        const productionTime = body.productionTime;

        Drink.findByIdAndUpdate(drinkId, { name, price, description, productionTime }, { new: true })
            .then((drink) => {
                if (!drink) {
                    res.status(404).json({ error: "Drink not found" });
                } else {
                    res.json(drink);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    deleteDrink(req: Request, res: Response): void {
        const drinkId = req.params.id;

        Drink.findByIdAndDelete(drinkId)
            .then((drink) => {
                if (!drink) {
                    res.status(404).json({ error: "Drink not found" });
                } else {
                    res.sendStatus(204);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
}

export default new DrinkController();
