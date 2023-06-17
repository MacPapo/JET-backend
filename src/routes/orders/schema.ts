import Joi from 'joi';
import { OrderStatus } from '../../database/model/Order';
import { JoiObjectId } from '../../helpers/validator';

export default {
    orderId: Joi.object().keys({
        id: JoiObjectId().required(),
    }),
    createOrder: Joi.object().keys({
        clients: Joi.number().integer().min(1).required(),
        table: JoiObjectId().required(),
        waiter: JoiObjectId().required(),
        foods: Joi.array().items(JoiObjectId()).required(),
        drinks: Joi.array().items(JoiObjectId()).required(),
    }),
    updateOrder: Joi.object().keys({
        table: Joi.number().integer().min(1),
        waiter: JoiObjectId(),
        foods: Joi.array().items(JoiObjectId()).required(),
        drinks: Joi.array().items(JoiObjectId()).required(),
        status: Joi.string().valid(...Object.values(OrderStatus)),
    }),
};
