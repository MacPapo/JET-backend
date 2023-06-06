import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";
import { Waiter } from "./interfaces/waiter.interface";

const WaiterSchema: Schema<Waiter> = new Schema({
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    password:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
});

const Waiter = mongooseService.getMongoose().model("Waiter", WaiterSchema);
export default Waiter;
