import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Order';
export const COLLECTION_NAME = 'orders';

export enum OrderStatus {
    PENDING = 'PENDING',
    STARTED = 'STARTED',
    COMPLETED = 'COMPLETED',
    ABORTED = 'ABORTED',
}

export default interface Order {
    _id: Types.ObjectId;
    table: Types.ObjectId;
    waiter: Types.ObjectId;
    foods?: Types.ObjectId[];
    drinks?: Types.ObjectId[];
    status: OrderStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema<Order>(
    {
        table: {
            type: Schema.Types.ObjectId,
            ref: 'TableModel',
            required: true,
            index: true,
        },
        waiter: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true,
            index: true,
        },
        foods: [
            {
                type: Schema.Types.ObjectId,
                ref: 'FoodModel',
            },
        ],
        drinks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'DrinkModel',
            },
        ],
        status: {
            type: Schema.Types.String,
            required: true,
            enum: Object.values(OrderStatus),
        },
        createdAt: {
            type: Schema.Types.Date,
            select: false,
        },
        updatedAt: {
            type: Schema.Types.Date,
            select: false,
        },
    },
);

schema.index({ table: 1 });
schema.index({ waiter: 1 });
schema.index({ table: 1, waiter: 1 });

export const OrderModel = model<Order>(DOCUMENT_NAME, schema, COLLECTION_NAME);
