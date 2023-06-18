import Order, { OrderModel } from '../model/Order';
import { Types } from 'mongoose';
import Food from '../model/Food';
import { FoodModel } from '../model/Food';

async function create(order: Order): Promise<Order> {
    const createdOrder = await OrderModel.create(order);
    return createdOrder.toObject();
}

async function update(order: Order): Promise<Order | null> {
    return OrderModel.findByIdAndUpdate(order._id, order, {
        new: true,
    })
        .lean()
        .exec();
}

async function findByTable(number: number): Promise<Order | null> {
    return OrderModel.findOne({ table: number }).lean().exec();
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

async function findAllOrderedFood(): Promise<Food[]> {
  try {
    // Trova tutti gli ordini con il campo "foods" popolato
    const orders = await OrderModel.find({ foods: { $exists: true, $ne: [] } });

    // Estrai tutti gli id dei cibi dagli ordini
    const foodIds = orders.flatMap((order) => order.foods);

    // Trova tutti i cibi corrispondenti agli id
    const foods = await FoodModel.find({ _id: { $in: foodIds } });

    return foods;
  } catch (error) {
    // Gestisci l'errore in base alle tue esigenze
    throw new Error('Failed to fetch ordered food');
  }
}

export default {
    create,
    update,

    // Waiter
    findByTable,
    findOrderById,

    // Cooker
    findAllOrderedFood,

    findAll,
    deleteOrder
};
