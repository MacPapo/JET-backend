import { Schema } from "mongoose";
import mongooseService from "../common/config/mongoose.config";
import { ITable } from "./interfaces/table.interface";

const TableSchema: Schema<ITable> = new Schema({
    tableNumber: { type: Number, required: true },
    seats: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true },
});

const Table = mongooseService.getMongoose().model("Table", TableSchema);
export default Table;
