import { Schema } from "mongoose";
import mongooseService from "../common/config/mongoose.config";
import { IProduct } from "./interfaces/product.interface";

const FoodSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    productionTime: { type: Number, required: true },
});

const Food = mongooseService.getMongoose().model("Food", FoodSchema);
export default Food;
