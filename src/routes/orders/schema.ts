import Joi from 'joi';
import { OrderStatus } from '../../database/model/Order';
import Drink from '../../database/model/Drink';
import Food from '../../database/model/Food';
import { JoiObjectId } from '../../helpers/validator';

export default {
    orderId: Joi.object().keys({
        id: JoiObjectId().required(),
    }),
    createOrder: Joi.object().keys({
        table: JoiObjectId().required(),
        waiter: JoiObjectId().required(),
        foods: Joi.array().items(JoiObjectId()).required(),
        drinks: Joi.array().items(JoiObjectId()).required(),
        status: Joi.string().valid(...Object.values(OrderStatus)).required(),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date().required(),
    }),
    updateOrder: Joi.object().keys({
        table: Joi.number().integer().min(1),
        waiter: JoiObjectId(),
        foods: Joi.array().items(Joi.object<Food>({
            name: Joi.string().required(),
            price: Joi.number().required().min(0),
            description: Joi.string().required(),
            productionTime: Joi.number().required().min(0),
        })),
        drinks: Joi.array().items(Joi.object<Drink>({
            name: Joi.string().required(),
            price: Joi.number().required().min(0),
            description: Joi.string().required(),
            productionTime: Joi.number().required().min(0),
        })),
        status: Joi.string().valid(...Object.values(OrderStatus)),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
    }),
};

// foods: Joi.array().items(Joi.object<Food>({
//             name: Joi.string().required(),
//             price: Joi.number().required().min(0),
//             description: Joi.string().required(),
//             productionTime: Joi.number().required().min(0),
//         })).required(),
//         drinks: Joi.array().items(Joi.object<Drink>({
//             name: Joi.string().required(),
//             price: Joi.number().required().min(0),
//             description: Joi.string().required(),
//             productionTime: Joi.number().required().min(0),
//         })).required(),
