import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";
import { Bartender } from "./interfaces/bartender.interface";

const BartenderSchema: Schema<Bartender> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Bartender = mongooseService.getMongoose().model("Bartender", BartenderSchema);
export default Bartender;
