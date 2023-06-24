import { CacheOrder, Order, OrderModel } from '../model/Order';
import { Types } from 'mongoose';
import { cacheGetAllOrders, cacheSaveOrder, cacheSaveOrders } from '../../cache/repository/OrderCache';
import { orderToCache } from '../../helpers/cacheData';

async function create(order: Order): Promise<Order> {
    const createdOrder = await OrderModel.create(order);
    return createdOrder.toObject();
}

async function update(order: Order): Promise<Order | null> {
    return OrderModel.findByIdAndUpdate(order._id, order, { new: true })
        .lean()
        .exec();
}

async function findByTable(number: number): Promise<Order | null> {
    return OrderModel.findOne({ table: number })
        .lean()
        .exec();
}

async function findOrderById(id: Types.ObjectId): Promise<Order | null> {
    return OrderModel.findOne({ id: id })
        .lean()
        .exec();
}

async function deleteOrder(id: Types.ObjectId): Promise<Order | null> {
    return OrderModel.findByIdAndDelete(id)
        .lean()
        .exec();
}

async function findAll(): Promise<Order[]> {
    return OrderModel.find()
        .lean()
        .exec();
}

async function findAllDetailed(): Promise<CacheOrder[] | null> {
    const cacheOrders: CacheOrder[] | null = await cacheGetAllOrders();
    if (cacheOrders) return cacheOrders;

    const orders: Order[] = await findAll();
    if (orders.length === 0) return [];

    const cacheData: CacheOrder[] = await Promise.all(
        orders.map(async (order) => await orderToCache(order))
    );
    await cacheSaveOrders(cacheData);
    return cacheGetAllOrders();
}

export default {
    create,
    update,

    // Waiter
    findByTable,
    findOrderById,

    findAllDetailed,

    findAll,
    deleteOrder
};
