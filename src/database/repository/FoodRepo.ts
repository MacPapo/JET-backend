import Food, { FoodModel } from '../model/Food';
import { Types } from 'mongoose';

async function create(food: Food): Promise<Food> {
    const createdFood = await FoodModel.create(food);
    return createdFood.toObject();
}

async function findFoodIfExists(name: string): Promise<Food | null> {
  return FoodModel.findOne({ name: name }).lean().exec();
}

async function findFoodById(id: Types.ObjectId): Promise<Food | null> {
    return FoodModel.findOne({ id: id }).lean().exec();
}

async function deleteFood(id: Types.ObjectId): Promise<Food | null> {
    return FoodModel.findByIdAndDelete(id).lean().exec();
}

async function findAll(): Promise<Food[]> {
    return FoodModel.find().lean().exec();
}

export default {
    create,
    findFoodIfExists,
    findFoodById,
    findAll,
    deleteFood
};
