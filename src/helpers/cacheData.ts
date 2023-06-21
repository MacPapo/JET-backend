import { map } from "lodash";
import Drink from "../database/model/Drink";
import Food from "../database/model/Food";
import DrinkRepo from "../database/repository/DrinkRepo";
import FoodRepo from "../database/repository/FoodRepo";
import { CacheOrder, CacheProductOrdered, Order } from "../database/model/Order";
import User from "../database/model/User";
import UserRepo from "../database/repository/UserRepo";
import { Types } from "mongoose";

export async function orderToCache(order: Order) {
    const FoodIds = map(order.foods, (food) => food._id);
    const DrinkIds = map(order.drinks, (drink) => drink._id);
    const waiter: string | Types.ObjectId = order.waiter;

    const waiterId: Types.ObjectId = typeof waiter === 'string'
        ? new Types.ObjectId(waiter)
        : waiter;

    const foodData: Food[] = await FoodRepo.findByIds(FoodIds);
    const drinkData: Drink[] = await DrinkRepo.findByIds(DrinkIds);
    const waiterData: User | null = await UserRepo.findWaiterById(waiterId);
    const waiterName =  waiterData
        ? waiterData.firstName + ' ' + waiterData.lastName
        : 'waiter';

    const cacheFoods: CacheProductOrdered[] =
        map(order.foods,
            (food) => ({
                _id: food._id,
                name: foodData
                    .find((f) => f._id.toString() === food._id.toString())?.name || '',
                productionTime: foodData
                    .find((f) => f._id.toString() === food._id.toString())?.productionTime || 0,
                quantity: food.quantity,
                checked: false
            }));

    const cacheDrinks: CacheProductOrdered[] =
        map(order.drinks,
            (drink) => ({
                _id: drink._id,
                name: drinkData.find((f) => f._id.toString() === drink._id.toString())?.name || '',
                productionTime: drinkData.find((f) => f._id.toString() === drink._id.toString())?.productionTime || 0,
                quantity: drink.quantity,
                checked: false
            }));

    const cacheOrder: CacheOrder = {
        _id: order._id,
        clients: order.clients,
        table: order.table,
        waiter: waiterName,
        foods: cacheFoods,
        drinks: cacheDrinks,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        checkedFood: false,
        checkedDrinks: false,
    };
    return cacheOrder;
}
