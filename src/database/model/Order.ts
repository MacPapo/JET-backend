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

export default interface Order {
    _id: Types.ObjectId;
    clients: number;
    table: number;
    waiter: Types.ObjectId;
    foods?: Types.ObjectId[];
    drinks?: Types.ObjectId[];
    status: OrderStatus;
    createdAt?: Date;
    updatedAt?: Date;
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
            ref: 'UserModel',
            required: true,
            index: true,
        },
        foods: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'FoodModel',
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
                    ref: 'DrinkModel',
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
