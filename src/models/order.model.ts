import { Schema } from "mongoose";
import mongooseService from "../common/services/mongoose.service";
import OrderStatus from "../common/utils/order_status";

const OrderSchema: Schema = new Schema({
    table: { type: Schema.Types.ObjectId, ref: "Table" },
    waiter: { type: Schema.Types.ObjectId, ref: "Waiter" },
    foods: [
        {
            type: Schema.Types.ObjectId,
            ref: "Food"
        }
    ],
    drinks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Drink"
        }
    ],
    status: { type: String, enum: OrderStatus, default: OrderStatus.PENDING },
});

const Order = mongooseService.getMongoose().model("Order", OrderSchema);
export default Order;
