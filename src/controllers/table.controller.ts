import { Request, Response } from "express";
import Table from "../models/table.model";

class TableController {
    getAllTables(req: Request, res: Response): void {
        Table.find()
            .then((tables) => {
                res.json(tables);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    getTableById(req: Request, res: Response): void {
        const tableId = req.params.id;

        Table.findById(tableId)
            .then((table) => {
                if (!table) {
                    res.status(404).json({ error: "Table not found" });
                } else {
                    res.json(table);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    createTable(req: Request, res: Response): void {
        const body = req.body;
        const tableNumber = body.tableNumber;
        const seats = body.seats;
        const isAvailable = body.isAvailable;

        const newTable = new Table({
            tableNumber,
            seats,
            isAvailable,
        });

        newTable
            .save()
            .then((table) => {
                res.status(201).json(table);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    updateTable(req: Request, res: Response): void {
        const tableId = req.params.id;
        const body = req.body;
        const tableNumber = body.tableNumber;
        const seats = body.seats;
        const isAvailable = body.isAvailable;

        Table.findByIdAndUpdate(tableId, { tableNumber, seats, isAvailable }, { new: true })
            .then((table) => {
                if (!table) {
                    res.status(404).json({ error: "Table not found" });
                } else {
                    res.json(table);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }

    deleteTable(req: Request, res: Response): void {
        const tableId = req.params.id;

        Table.findByIdAndDelete(tableId)
            .then((table) => {
                if (!table) {
                    res.status(404).json({ error: "Table not found" });
                } else {
                    res.sendStatus(204);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
}

export default new TableController();
