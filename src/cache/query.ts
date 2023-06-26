import cache from '.';
import { DynamicKeyType } from './keys';

export enum TYPES {
    LIST = 'list',
    STRING = 'string',
    HASH = 'hash',
    ZSET = 'zset',
    SET = 'set',
}

export async function keyExists(...keys: string[]) {
    return (await cache.exists(keys)) ? true : false;
}

export async function setValue(
    key: DynamicKeyType,
    value: string | number,
    expireAt: Date | null = null,
) {
    if (expireAt) return cache.pSetEx(key, expireAt.getTime(), `${value}`);
    else return cache.set(key, `${value}`);
}

export async function getValue(key: DynamicKeyType) {
    return cache.get(key);
}

export async function delByKey(key: DynamicKeyType) {
    return cache.del(key);
}

export async function setJson(
    key: DynamicKeyType,
    value: Record<string, unknown>,
    expireAt: Date | null = null,
) {
    const json = JSON.stringify(value);
    return await setValue(key, json, expireAt);
}

export async function getJson<T>(key: DynamicKeyType) {
    const type = await cache.type(key);
    if (type !== TYPES.STRING) return null;

    const json = await getValue(key);
    if (json) return JSON.parse(json) as T;

    return null;
}

export async function setList(
    key: DynamicKeyType,
    list: any[],
    expireAt: Date | null = null,
) {
    const multi = cache.multi();
    if (list && list.length > 0) {
        const values: any[] = []
        for (const i in list) {
            values[i] = JSON.stringify(list[i]);
        }
        multi.del(key);
        multi.rPush(key, values);
        if (expireAt) multi.pExpireAt(key, expireAt.getTime());
    }
    return await multi.exec();
}

export async function updateList(
    key: DynamicKeyType,
    index: number,
    value: any
) {
    console.log("UPDATE LIST " + key + " " + index + " " + JSON.stringify(value));
    return await cache.lSet(key, index, JSON.stringify(value));
}

export async function addToList(key: DynamicKeyType, value: any) {
    const type = await cache.type(key);
    if (type !== TYPES.LIST) return null;

    const item = JSON.stringify(value);
    return await cache.rPushX(key, item);
}

export async function getListRange<T>(
    key: DynamicKeyType,
    start = 0,
    end = -1,
) {
    const type = await cache.type(key);
    if (type !== TYPES.LIST) return null;

    const list = await cache.lRange(key, start, end);
    if (!list) return null;

    const data = list.map((entry) => JSON.parse(entry) as T);
    return data;
}

export async function watch(key: DynamicKeyType) {
    return await cache.watch(key);
}

export async function unwatch() {
    return await cache.unwatch();
}

export async function expire(expireAt: Date, key: DynamicKeyType) {
    return await cache.pExpireAt(key, expireAt.getTime());
}

export async function expireMany(expireAt: Date, ...keys: string[]) {
    let script = '';
    for (const key of keys) {
        script += `redis.call('pExpireAt', '${key}',${expireAt.getTime()})`;
    }
    return await cache.eval(script);
}
