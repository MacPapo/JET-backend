import Joi from 'joi';
import { OrderStatus } from '../../database/model/Order';
import { JoiObjectId } from '../../helpers/validator';

export default {
    orderId: Joi.object().keys({
        id: JoiObjectId().required(),
    }),
    createOrder: Joi.object().keys({
        clients: Joi.number().integer().min(1).required(),
        table: Joi.number().integer().min(1).required(),
        waiter: JoiObjectId().required(),
        foods: Joi.array().items({
            _id: JoiObjectId().required(),
            quantity: Joi.number().integer().min(1).required(),
        }).required(),
        drinks: Joi.array().items({
            _id: JoiObjectId().required(),
            quantity: Joi.number().integer().min(1).required(),
        }).required(),
    }),
    updateOrder: Joi.object().keys({
        clients: Joi.number().integer().min(1).optional(),
        table: Joi.number().integer().min(1).optional(),
        waiter: JoiObjectId().optional(),
        foods: Joi.array().items({
            _id: JoiObjectId().required(),
            quantity: Joi.number().integer().min(1).required(),
        }).optional(),
        drinks: Joi.array().items({
            _id: JoiObjectId().required(),
            quantity: Joi.number().integer().min(1).required(),
        }).optional(),
        status: Joi.string().valid(...Object.values(OrderStatus)).optional(),
    }),
};
