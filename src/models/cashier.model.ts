import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";
import { IUser } from "./interfaces/user.interface";

interface ICashier extends IUser {
    admin: boolean;
}

const CashierSchema: Schema<ICashier> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    admin: { type: Boolean, required: true },
});

const Cashier = mongooseService.getMongoose().model("Cashier", CashierSchema);
export default Cashier;
