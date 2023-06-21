export enum DynamicKey {
    ORDER = 'ORDER',
    FOOD = 'FOOD',
    DRINK = 'DRINK',
}

export type DynamicKeyType = `${DynamicKey}_${string}`;

export function getDynamicKey(key: DynamicKey, suffix: string) {
    const dynamic: DynamicKeyType = `${key}_${suffix}`;
    return dynamic;
}
