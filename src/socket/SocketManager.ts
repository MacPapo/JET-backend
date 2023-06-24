import { Server } from "socket.io";
import { CacheOrder, Order, OrderStatus } from "../database/model/Order";
import { updateFoodStatus, updateOrder } from "../cache/repository/OrderCache";
import { sockerPort } from '../config';
import OrderRepo from "../database/repository/OrderRepo";
import { Types } from "mongoose";

class SocketManager {
    private static instance: SocketManager;
    private io = new Server(sockerPort, { cors: { origin: '*' } });


    private async updateStatus(order: CacheOrder): Promise<void> {
        let orderUpdated: Order | null;
        if (Boolean(order.checkedFoods) &&
            Boolean(order.checkedDrinks)) {
            orderUpdated = await OrderRepo.findOrderById(new Types.ObjectId(order._id));
            if (!orderUpdated) { throw new Error('Order does not exist'); }

            orderUpdated.status = OrderStatus.COMPLETED;
            order.status = OrderStatus.COMPLETED;
        } else if (
            (Boolean(order.checkedFoods) && !Boolean(order.checkedDrinks) ||
                !Boolean(order.checkedFoods) && Boolean(order.checkedDrinks) &&
                order.status !== OrderStatus.COMPLETED)) {
            orderUpdated = await OrderRepo.findOrderById(new Types.ObjectId(order._id));
            if (!orderUpdated) { throw new Error('Order does not exist'); }

            orderUpdated.status = OrderStatus.STARTED;
            order.status = OrderStatus.STARTED;
        } else {
            throw new Error('Order status cannot be updated');
        }

        try {
            if (!orderUpdated) { throw new Error('Order does not exist'); }
            OrderRepo.update(orderUpdated);
            updateOrder(order);
        } catch (error) {
            console.log(error);
        }
    }

    handleConnection() {
        console.log('Socket server running on port ' + sockerPort);

        this.io.on('connection', (socket) => {
            console.log('New connection: ' + socket.id);

            socket.on(
                'waiter-new-order',
                (order) => {
                    this.io.emit(
                        'waiter-new-order',
                        'New Order on table n.' + order.table + ' Added!');
                }
            );

            socket.on(
                'waiter-update-order',
                (update) => {
                    this.io.emit(
                        'waiter-update-order',
                        "Update order" + update.id + " set to " + update.status);
                }
            );

            socket.on(
                'cooker-new-order',
                (order) => {
                    this.io.emit(
                        'cooker-new-order',
                        'New Order on table n.' + order.table + ' Added!');
                }
            );

            socket.on(
                'bartender-new-order',
                (order) => {
                    this.io.emit(
                        'bartender-new-order',
                        'New Order on table n.' + order.table + ' Added!');
                }
            );

            socket.on(
                'cooker-complete-order',
                (order) => {

                    try {
                        updateOrder(order);
                        this.updateStatus(order);
                    } catch (error) {
                        console.log(error);
                    }

                    this.io.emit('cooker-complete-order', 'Updated');

                    const message = Boolean(order.checkedFoods)
                        ? 'Foods completed on table n.' + order.table
                        : 'Foods aborted on table n.' + order.table;
                    this.io.emit('waiter-update-order', message);
                }
            );

            socket.on(
                'bartender-complete-order',
                (order) => {

                    try {
                        updateOrder(order);
                        this.updateStatus(order);
                    } catch (error) {
                        console.log(error);
                    }

                    this.io.emit('bartender-complete-order', 'Updated');

                    const message = Boolean(order.checkedDrinks)
                        ? 'Drinks completed on table n.' + order.table
                        : 'Drinks aborted on table n.' + order.table;
                    this.io.emit('waiter-update-order', message);
                }
            );

            socket.on(
                'waiter-complete-order',
                (order) => {
                    order.status = OrderStatus.SERVED;
                    OrderRepo.update(order);
                    updateOrder(order);
                    this.io.emit('waiter-complete-order', 'Order delivered successfully');
                }
            );

            socket.on(
                'cashier-bill-available',
                (message) => {
                    this.io.emit('cashier-bill-available', message);
                }
            );

            socket.on('error', function (err) {
                console.log(err);
            });

        });

        this.io.on('disconnect', (socket) => {
            console.log('Disconnect: ' + socket.id);
        });

    }

    static getInstance(): SocketManager {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager();
        }
        return SocketManager.instance;
    }
}

export default SocketManager.getInstance();
