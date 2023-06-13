import Drink, { DrinkModel } from '../model/Drink';
import { Types } from 'mongoose';

async function create(drink: Drink): Promise<Drink> {
    const createdDrink = await DrinkModel.create(drink);
    return createdDrink.toObject();
}

async function update(drink: Drink): Promise<Drink | null> {
    return DrinkModel.findByIdAndUpdate(drink._id, drink, {
      new: true,
    })
    .lean()
    .exec();
}

async function hasSameName(name: string): Promise<Boolean> {
    return await findDrinkIfExists(name) != null ? true : false;
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
    update,
    hasSameName,
    findDrinkIfExists,
    findDrinkById,
    findAll,
    deleteDrink
};
