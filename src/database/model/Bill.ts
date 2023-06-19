import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Bill';
export const COLLECTION_NAME = 'bills';

export default interface Bill {
    _id: Types.ObjectId;
    clients: number;
    table: number;
    totalPrice: number;
    foods?: Types.ObjectId[];
    drinks?: Types.ObjectId[];
    serviceCharge: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema(
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
        totalPrice: {
            type: Schema.Types.Number,
            required: true,
            min: 0,
        },
        foods: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'FoodModel',
                },
                price: {
                    type: Schema.Types.Number,
                    required: true,
                    min: 0,
                },
                quantity: {
                    type: Schema.Types.Number,
                    required: true,
                    min: 1,
                },
            }
        ],
        drinks: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'DrinkModel',
                },
                price: {
                    type: Schema.Types.Number,
                    required: true,
                    min: 0,
                },
                quantity: {
                    type: Schema.Types.Number,
                    required: true,
                    min: 1,
                },
            }
        ],
        serviceCharge: {
            type: Schema.Types.Number,
            required: true,
            min: 0,
        },
        createdAt: {
            type: Schema.Types.Date,
            required: true,
            default: Date.now,
        },
        updatedAt: {
            type: Schema.Types.Date,
            required: true,
            default: Date.now,
        },
    },
);

schema.index({ table: 1 });

export const BillModel = model<Bill>(DOCUMENT_NAME, schema, COLLECTION_NAME);
