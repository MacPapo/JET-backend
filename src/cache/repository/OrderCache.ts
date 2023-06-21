import { addToList, getJson, getListRange, setList } from '../query';
import { Types } from 'mongoose';
import { DynamicKey, getDynamicKey } from '../keys';
import { CacheOrder } from '../../database/model/Order';

function getKeyForId(id: Types.ObjectId) {
    return getDynamicKey(DynamicKey.ORDER, id.toHexString());
}

export async function cacheSaveOrder(order: CacheOrder) {
    const res = await addToList(getDynamicKey(DynamicKey.ORDER, '*'), order);
    if (!res) await cacheSaveOrders( [ order ] as CacheOrder[]);
}

export async function cacheSaveOrders(orders: CacheOrder[]) {
    const expireTomorrow = new Date();
    expireTomorrow.setDate(expireTomorrow.getDate() + 1);

    await setList(getDynamicKey(DynamicKey.ORDER, '*'),
                  orders,
                  expireTomorrow);
}

export async function cacheGetOrder(id: Types.ObjectId) {
    return getJson<CacheOrder>(getKeyForId(id));
}

export async function cacheGetAllOrders(): Promise<CacheOrder[] | null> {
    return await getListRange<CacheOrder>(getDynamicKey(DynamicKey.ORDER, '*'));
}
