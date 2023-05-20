import { Document } from "mongoose";

export interface ITable extends Document {
    tableNumber: number,
    seats: number,
    isAvailable: boolean,
}
