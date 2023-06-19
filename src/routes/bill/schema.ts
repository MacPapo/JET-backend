import Joi from 'joi';
import { JoiObjectId } from '../../helpers/validator';

export default {
    billId: Joi.object().keys({
        id: JoiObjectId().required(),
    }),
    createBill: Joi.object().keys({
        clients: Joi.number().integer().min(1).required(),
        table: Joi.number().integer().min(1).required(),
        total_price: Joi.number().integer().min(1).required(),
        foods: Joi.array().items({
            _id: JoiObjectId().required(),
            price: Joi.number().integer().min(1).required(),
            quantity: Joi.number().integer().min(1).required(),
        }).required(),
        drinks: Joi.array().items({
            _id: JoiObjectId().required(),
            price: Joi.number().integer().min(1).required(),
            quantity: Joi.number().integer().min(1).required(),
        }).required(),
        serviceCharge: Joi.number().integer().min(1).required(),
    }),
};
