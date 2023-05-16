import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";

const StatisticSchema: Schema = new Schema({
    day: { type: Date, required: true },
    dish_of_the_day: { type: String, required: true },
});

const Statistic = mongooseService.getMongoose().model("Statistic", StatisticSchema);
export default Statistic;