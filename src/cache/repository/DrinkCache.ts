import { getJson, getListRange, setJson, setList } from '../query';
import { Types } from 'mongoose';
import { DynamicKey, getDynamicKey } from '../keys';
import Drink from '../../database/model/Drink';

export function getKeyForId(id: Types.ObjectId) {
    return getDynamicKey(DynamicKey.DRINK, id.toHexString());
}

export async function cacheSaveDrink(drink: Drink) {
    return setJson(
        getKeyForId(drink._id),
        { ...drink },
    );
}

export async function cacheSaveDrinks(drinks: Drink[]): Promise<void> {
    await setList(getDynamicKey(DynamicKey.DRINK, '*'), drinks);
}

export async function cacheGetAllDrinks(): Promise<Drink[] | null> {
    return await getListRange<Drink>(getDynamicKey(DynamicKey.DRINK, '*'));
}

export async function cacheGetDrink(id: Types.ObjectId) {
    return getJson<Drink>(getKeyForId(id));
}
