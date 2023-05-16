import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";

const CookerSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
});

const Cooker = mongooseService.getMongoose().model("Cooker", CookerSchema);
export default Cooker;
