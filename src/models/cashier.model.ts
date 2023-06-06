import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";
import { Cashier } from "./interfaces/cashier.interface";

const CashierSchema: Schema<Cashier> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
});

const Cashier = mongooseService.getMongoose().model("Cashier", CashierSchema);
export default Cashier;
