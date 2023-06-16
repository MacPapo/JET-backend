import Food, { FoodModel } from '../model/Food';
import { Types } from 'mongoose';

async function create(food: Food): Promise<Food> {
    const createdFood = await FoodModel.create(food);
    return createdFood.toObject();
}

async function update(food: Food): Promise<Food | null> {
    return FoodModel.findByIdAndUpdate(food._id, food, {
        new: true,
    })
        .lean()
        .exec();
}

async function hasSameName(name: string): Promise<Boolean> {
    return await findFoodIfExists(name) != null ? true : false;
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

async function findByIds(ids: Types.ObjectId[]): Promise<Food[]> {
    return FoodModel.find({ _id: { $in: ids } }).lean().exec();
}

export default {
    create,
    update,
    hasSameName,
    findFoodIfExists,
    findFoodById,
    findAll,
    deleteFood,
    findByIds,
};
