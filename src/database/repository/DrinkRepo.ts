import Drink, { DrinkModel } from '../model/Drink';
import { Types } from 'mongoose';

async function create(drink: Drink): Promise<Drink> {
    const createdDrink = await DrinkModel.create(drink);
    return createdDrink.toObject();
}

async function findDrinkIfExists(name: string): Promise<Drink | null> {
  return DrinkModel.findOne({ name: name }).lean().exec();
}

export default {
    create,
    findDrinkIfExists,
};
