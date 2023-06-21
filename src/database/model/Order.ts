import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Order';
export const COLLECTION_NAME = 'orders';

export enum OrderStatus {
    PENDING = 'PENDING',
    STARTED = 'STARTED',
    COMPLETED = 'COMPLETED',
    ABORTED = 'ABORTED',
    SERVED = 'SERVED',
}

export interface ProductOrdered {
    _id: Types.ObjectId;
    quantity: number;
}

export interface CacheProductOrdered {
    _id: Types.ObjectId;
    name: string;
    productionTime: number;
    quantity: number;
    checked: boolean;
}

export interface Order {
    _id: Types.ObjectId;
    clients: number;
    table: number;
    waiter: Types.ObjectId | string;
    foods: ProductOrdered[] | CacheProductOrdered[];
    drinks: ProductOrdered[] | CacheProductOrdered[];
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CacheOrder extends Order {
    checkedFood: boolean;
    checkedDrinks: boolean;
}
    

const schema = new Schema<Order>(
    {
        clients: {
            type: Schema.Types.Number,
            required: true,
            min: 1,
        },
        table: {
            type: Schema.Types.Number,
            required: true,
            index: true,
        },
        waiter: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        foods: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Food',
                },
                quantity: {
                    type: Schema.Types.Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        drinks: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Drink',
                },
                quantity: {
                    type: Schema.Types.Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        status: {
            type: Schema.Types.String,
            required: true,
            enum: Object.values(OrderStatus),
        },
        createdAt: {
            type: Schema.Types.Date,
            required: true,
            select: false,
        },
        updatedAt: {
            type: Schema.Types.Date,
            required: true,
            select: false,
        },
    },
);

schema.index({ table: 1 });
schema.index({ waiter: 1 });
schema.index({ table: 1, waiter: 1 });

export const OrderModel = model<Order>(DOCUMENT_NAME, schema, COLLECTION_NAME);
