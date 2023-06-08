import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Table';
export const COLLECTION_NAME = 'tables';

export default interface Table {
    _id: Types.ObjectId;
    number: number;
    seats: number;
    isAvailable: boolean;
}

const schema = new Schema<Table>(
    {
        number: {
            type: Schema.Types.Number,
            required: true,
            min: 0,
            index: true,
        },
        seats: {
            type: Schema.Types.Number,
            required: true,
            min: 1,
        },
        isAvailable: {
            type: Schema.Types.Boolean,
            required: true,
            default: true,
        },
    },
);

schema.index({ number: 1 });

export const TableModel = model<Table>(DOCUMENT_NAME, schema, COLLECTION_NAME);
