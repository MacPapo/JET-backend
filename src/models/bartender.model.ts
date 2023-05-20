import { Schema } from "mongoose";
import mongooseService from "../common/config/mongoose.config";
import { IUser } from "./interfaces/user.interface";

const BartenderSchema: Schema<IUser> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const Bartender = mongooseService.getMongoose().model("Bartender", BartenderSchema);
export default Bartender;
