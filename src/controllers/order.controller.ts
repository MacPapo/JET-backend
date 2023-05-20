import { Request, Response } from "express";
import Order from "../models/order.model";
import StatusCode from "../common/utils/status_code";

class OrderController {
    getAllOrders(req: Request, res: Response): void {
        Order.find()
            .then((orders) => {
                res.json(orders);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    getOrderById(req: Request, res: Response): void {
        const orderId = req.params.id;

        Order.findById(orderId)
            .then((order) => {
                if (!order) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Order not found" });
                } else {
                    res.json(order);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    createOrder(req: Request, res: Response): void {
        const body = req.body;
        const table = body.table;
        const waiter = body.waiter;
        const foods = body.foods
        const drinks = body.drinks;
        const status = body.status;

        const newOrder = new Order({
            table,
            waiter,
            foods,
            drinks,
            status
        });

        newOrder
            .save()
            .then((order) => {
                res.status(StatusCode.CREATED).json(order);
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    updateOrder(req: Request, res: Response): void {
        const orderId = req.params.id;
        const body = req.body;
        const table = body.table;
        const waiter = body.waiter;
        const foods = body.foods
        const drinks = body.drinks;
        const status = body.status;

        Order.findByIdAndUpdate(orderId, { table, waiter, foods, drinks, status }, { new: true })
            .then((order) => {
                if (!order) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Order not found" });
                } else {
                    res.json(order);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }

    deleteOrder(req: Request, res: Response): void {
        const orderId = req.params.id;

        Order.findByIdAndDelete(orderId)
            .then((order) => {
                if (!order) {
                    res.status(StatusCode.NOT_FOUND).json({ error: "Order not found" });
                } else {
                    res.sendStatus(StatusCode.NO_CONTENT);
                }
            })
            .catch((err) => {
                res.status(StatusCode.SERVER_ERROR).json({ error: err.message });
            });
    }
}

export default new OrderController();
