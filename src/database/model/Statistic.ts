import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Statistic';
export const COLLECTION_NAME = 'statistics';

export default interface Statistic {
    _id: Types.ObjectId;
    day: Date,
    dishOfTheDay: string;
}

const schema = new Schema<Statistic>(
  {
    day: {
      type: Schema.Types.Date,
      required: true,
    },
    dishOfTheDay: {
      type: Schema.Types.String,
      required: true,
    },
  },
);

schema.index({ day: 1, dishOfTheDay: 1 });

export const StatisticModel = model<Statistic>(DOCUMENT_NAME, schema, COLLECTION_NAME);
