import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";
import { IUser } from "./interfaces/user.interface";

const CookerSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Cooker = mongooseService.getMongoose().model("Cooker", CookerSchema);
export default Cooker;
