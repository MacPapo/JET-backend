import { Schema } from "mongoose";
import mongooseService from "../common/config/mongoose.config";
import OrderStatus from "../common/utils/order_status";
import { IOrder } from "./interfaces/order.interface";

const OrderSchema: Schema<IOrder> = new Schema({
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
