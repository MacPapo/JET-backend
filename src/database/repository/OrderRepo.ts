import Order, { OrderModel } from '../model/Order';
import { Types } from 'mongoose';

async function create(order: Order): Promise<Order> {
    const createdOrder = await OrderModel.create(order);
    return createdOrder.toObject();
}

async function update(order: Order): Promise<Order | null> {
    return OrderModel.findByIdAndUpdate(order._id, order, {
        new: true,
    }).lean().exec();
}

async function findByTable(number: number): Promise<Order | null> {
    return OrderModel.findOne({ table: number }).lean().exec();
}

async function findOrderById(id: Types.ObjectId): Promise<Order | null> {
    return OrderModel.findOne({ id: id }).lean().exec();
}

async function deleteOrder(id: Types.ObjectId): Promise<Order | null> {
    return OrderModel.findByIdAndDelete(id).lean().exec();
}

async function findAll(): Promise<Order[]> {
    return OrderModel.find().lean().exec();
}

export default {
    create,
    update,
    findByTable,
    findOrderById,
    findAll,
    deleteOrder
};
