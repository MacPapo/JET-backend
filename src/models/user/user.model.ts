import { Schema } from "mongoose";
import mongooseService from "../../common/services/mongoose.service";

// Fix the following error:
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongooseService.getMongoose().model("User", UserSchema);
