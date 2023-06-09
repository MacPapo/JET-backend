import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Food';
export const COLLECTION_NAME = 'foods';

export default interface Food {
    _id: Types.ObjectId;
    name: string;
    price: number;
    description?: string;
    productionTime: number;
}

const schema = new Schema<Food>(
    {
        name: {
            type: Schema.Types.String,
            trim: true,
            unique: true,
            maxlength: 200,
            index: true
        },
        price: {
            type: Schema.Types.Number,
            required: true,
            min: 0
        },
        description: {
            type: Schema.Types.String,
            trim: true,
            maxlength: 200,
        },
        productionTime: {
            type: Schema.Types.Number,
            required: true,
            min: 0
        },
    },
);

schema.index({ name: 1 });

export const FoodModel = model<Food>(DOCUMENT_NAME, schema, COLLECTION_NAME);
