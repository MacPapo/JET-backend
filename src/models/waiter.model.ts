import { Schema } from "mongoose";
import mongooseService from "../common/config/mongoose.config";
import { IUser } from "./interfaces/user.interface";

const WaiterSchema: Schema<IUser> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const Waiter = mongooseService.getMongoose().model("Waiter", WaiterSchema);
export default Waiter;
