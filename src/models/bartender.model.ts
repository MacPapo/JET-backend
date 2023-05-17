import { Schema } from "mongoose";
import mongooseService from "../common/config/mongoose.config";

const BartenderSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
});

const Bartender = mongooseService.getMongoose().model("Bartender", BartenderSchema);
export default Bartender;
