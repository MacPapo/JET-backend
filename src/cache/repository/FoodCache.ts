import { getJson, getListRange, setJson, setList } from '../query';
import { Types } from 'mongoose';
import { DynamicKey, getDynamicKey } from '../keys';
import Food from '../../database/model/Food';

export function getKeyForId(id: Types.ObjectId) {
    return getDynamicKey(DynamicKey.FOOD, id.toHexString());
}

export async function cacheSaveFood(food: Food) {
    return setJson(
        getKeyForId(food._id),
        { ...food },
    );
}

export async function cacheSaveFoods(foods: Food[]): Promise<void> {
    await setList(getDynamicKey(DynamicKey.FOOD, '*'), foods);
}

export async function cacheGetAllFoods(): Promise<Food[] | null> {
    return await getListRange<Food>(getDynamicKey(DynamicKey.FOOD, '*'));
}


export async function cacheGetFood(id: Types.ObjectId) {
    return getJson<Food>(getKeyForId(id));
}
