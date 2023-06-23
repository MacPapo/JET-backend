import { addToList, getJson, getListRange, setList, updateList } from '../query';
import { Types } from 'mongoose';
import { DynamicKey, getDynamicKey } from '../keys';
import { CacheOrder, CacheProductOrdered } from '../../database/model/Order';

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

export async function updateOrder(order: any) {
    const list = await getListRange<CacheOrder>(getDynamicKey(DynamicKey.ORDER, '*'));
    if (!list) return;

    const index = list.findIndex((o: CacheOrder) => o._id.toString() === order._id);
    if (index === -1) return;

    return await updateList(getDynamicKey(DynamicKey.ORDER, '*'),
                            index,
                            order);
}

export async function updateFoodStatus(
    orderId: string,
    foodId:  string,
    status:  string,
) {
    const list = await getListRange<CacheOrder>(getDynamicKey(DynamicKey.ORDER, '*'));
    if (!list) return;

    const orderIndex = list.findIndex((o: CacheOrder) => o._id.toString() === orderId);
    if (orderIndex === -1) return;

    console.log("ORDER INDEX " + orderIndex);
    console.log("ORDER " + JSON.stringify(list[orderIndex]));

    console.log("FOOD ID " + foodId);
    const foodIndex = list[orderIndex].foods.findIndex((f: CacheProductOrdered) => f._id.toString() === foodId);
    if (foodIndex === -1) return;

    console.log("FOOD INDEX " + foodIndex);

    list[orderIndex].foods[foodIndex].checked = Boolean(status);
    console.log("STATUS: " + list[orderIndex].foods[foodIndex].checked)
    
    return await updateList(
        getDynamicKey(DynamicKey.ORDER, '*'),
        orderIndex,
        list[orderIndex]
    );
}

export async function cacheGetOrder(id: Types.ObjectId) {
    return getJson<CacheOrder>(getKeyForId(id));
}

export async function cacheGetAllOrders(): Promise<CacheOrder[] | null> {
    return await getListRange<CacheOrder>(getDynamicKey(DynamicKey.ORDER, '*'));
}
