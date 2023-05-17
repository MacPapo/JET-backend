import { Schema } from "mongoose";
import mongooseService from "../common/config/mongoose.config";

const FoodSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    productionTime: { type: Number, required: true },
});

const Food = mongooseService.getMongoose().model("Food", FoodSchema);
export default Food;
