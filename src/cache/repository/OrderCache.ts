import { getJson, setJson } from '../query';
import { Types } from 'mongoose';
import { DynamicKey, getDynamicKey } from '../keys';
import { CacheOrder } from '../../database/model/Order';

function getKeyForId(id: Types.ObjectId) {
    return getDynamicKey(DynamicKey.ORDER, id.toHexString());
}

export async function cacheSaveOrder(order: CacheOrder) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return setJson(
        getKeyForId(order._id),
        { ...order },
        tomorrow
    );
}

export async function cacheGetOrder(id: Types.ObjectId) {
    return getJson<CacheOrder>(getKeyForId(id));
}
