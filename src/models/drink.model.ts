import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";
import { IProduct } from "./interfaces/product.interface";

const DrinkSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    productionTime: { type: Number, required: true },
});

const Drink = mongooseService.getMongoose().model("Drink", DrinkSchema);
export default Drink;
