import { Schema } from "mongoose";
import mongooseService from "../common/config/mongoose.config";

const WaiterSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
});

const Waiter = mongooseService.getMongoose().model("Waiter", WaiterSchema);
export default Waiter;
