import { Document } from "mongoose";

export interface IStatistic extends Document {
    day: Date,
    dishOfTheDay: string,
}
