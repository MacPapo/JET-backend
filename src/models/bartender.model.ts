import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";

const BartenderSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
});

const Bartender = mongooseService.getMongoose().model("Bartender", BartenderSchema);
export default Bartender;
