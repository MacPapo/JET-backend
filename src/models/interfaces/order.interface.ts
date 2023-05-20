import { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    table: Schema.Types.ObjectId,
    waiter: Schema.Types.ObjectId,
    foods: Schema.Types.ObjectId[],
    drinks: Schema.Types.ObjectId[],
    status: Schema.Types.ObjectId,
}
