import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";

const TableSchema: Schema = new Schema({
    tableNumber: { type: Number, required: true },
    seats: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true },
});

const Table = mongooseService.getMongoose().model("Table", TableSchema);
export default Table;
