import { Schema } from "mongoose";
import mongooseService from "../../common/services/mongoose.service";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongooseService.getMongoose().model("User", UserSchema);
export default User;
