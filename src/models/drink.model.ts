import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";

const DrinkSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    productionTime: { type: Number, required: true },
});

const Drink = mongooseService.getMongoose().model("Drink", DrinkSchema);
export default Drink;
