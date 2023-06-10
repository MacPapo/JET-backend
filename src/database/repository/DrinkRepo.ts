import Drink, { DrinkModel } from '../model/Drink';
import { Types } from 'mongoose';

async function create(drink: Drink): Promise<Drink> {
    const createdDrink = await DrinkModel.create(drink);
    return createdDrink.toObject();
}

async function findDrinkIfExists(name: string): Promise<Drink | null> {
  return DrinkModel.findOne({ name: name }).lean().exec();
}

async function findDrinkById(id: Types.ObjectId): Promise<Drink | null> {
    return DrinkModel.findOne({ id: id }).lean().exec();
}

async function findAll(): Promise<Drink[]> {
    return DrinkModel.find().lean().exec();
}

async function deleteDrink(id: Types.ObjectId): Promise<Drink | null> {
    return DrinkModel.findByIdAndDelete(id).lean().exec();
}

export default {
    create,
    findDrinkIfExists,
    findDrinkById,
    findAll,
    deleteDrink
};
