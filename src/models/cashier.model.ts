import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";

const CashierSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: Boolean, required: true },
});

const Cashier = mongooseService.getMongoose().model("Cashier", CashierSchema);
export default Cashier;
