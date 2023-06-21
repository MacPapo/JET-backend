import Drink, { DrinkModel } from '../model/Drink';
import { Types } from 'mongoose';
import { cacheSaveDrink, cacheSaveDrinks, cacheGetAllDrinks, cacheGetDrink } from '../../cache/repository/DrinkCache';

async function create(drink: Drink): Promise<Drink> {
    const createdDrink = await DrinkModel.create(drink);

    try {
        await cacheSaveDrink(drink);
    } catch (error) {
        console.log(error);
    }

    return createdDrink.toObject();
}

async function update(drink: Drink): Promise<Drink | null> {
    return DrinkModel
        .findByIdAndUpdate(drink._id, drink, { new: true })
        .lean()
        .exec();
}

async function hasSameName(name: string): Promise<Boolean> {
    return await findDrinkIfExists(name) != null ? true : false;
}

async function findDrinkIfExists(name: string): Promise<Drink | null> {
    return DrinkModel
        .findOne({ name: name })
        .lean()
        .exec();
}

async function findDrinkById(id: Types.ObjectId): Promise<Drink | null> {
    const cachedData = await cacheGetDrink(id);
    if (cachedData) return cachedData;

    return DrinkModel
        .findOne({ id: id })
        .lean()
        .exec();
}

async function deleteDrink(id: Types.ObjectId): Promise<Drink | null> {
    return DrinkModel
        .findByIdAndDelete(id)
        .lean()
        .exec();
}

async function findAll(): Promise<Drink[]> {
    const cachedData = await cacheGetAllDrinks();
    if (cachedData) return cachedData;

    const drinkData: Drink[] = await DrinkModel
        .find()
        .lean()
        .exec();

    await cacheSaveDrinks(drinkData);
    return drinkData;
}

async function findByIds(ids: Types.ObjectId[]): Promise<Drink[]> {
    return DrinkModel
        .find({ _id: { $in: ids } })
        .lean()
        .exec();
}

export default {
    create,
    update,
    hasSameName,
    findDrinkIfExists,
    findDrinkById,
    findAll,
    deleteDrink,
    findByIds,
};
