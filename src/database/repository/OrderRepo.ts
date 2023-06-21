import { CacheOrder, Order, OrderModel } from '../model/Order';
import { Types } from 'mongoose';
import { cacheGetAllOrders } from '../../cache/repository/OrderCache';

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
    return cacheGetAllOrders();
}

async function findAllOrderedFoods() {
    try {
        const orders = await OrderModel
            .find({ foods: { $exists: true, $ne: [] } })
            .select('table waiter foods createdAt updatedAt')
            .populate('waiter', 'firstName lastName')
            .populate('foods._id', 'name productionTime')
            .lean()
            .exec();

        return orders;
    } catch (error) {
        throw new Error('Failed to fetch ordered drinks');
    }
}

async function findAllOrderedDrinks() {
    try {
        const orders = await OrderModel
            .find({ drinks: { $exists: true, $ne: [] } })
            .select('table waiter drinks createdAt updatedAt')
            .populate('waiter', 'firstName lastName')
            .populate('drinks._id', 'name productionTime')
            .lean()
            .exec();

        return orders;
    } catch (error) {
        throw new Error('Failed to fetch ordered drinks');
    }
}

export default {
    create,
    update,

    // Waiter
    findByTable,
    findOrderById,

    // Cooker
    findAllOrderedFoods,

    // Bartender
    findAllOrderedDrinks,
    findAllDetailed,

    findAll,
    deleteOrder
};
