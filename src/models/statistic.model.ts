import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";
import { IStatistic } from "./interfaces/statistic.interface";

const StatisticSchema: Schema<IStatistic> = new Schema({
    day: { type: Date, required: true },
    dishOfTheDay: { type: String, required: true },
});

const Statistic = mongooseService.getMongoose().model("Statistic", StatisticSchema);
export default Statistic;
