import Joi from 'joi';
import { JoiObjectId } from '../../helpers/validator';

export default {
    drinkCreate: Joi.object().keys({
        name: Joi.string().required().min(3).max(1000),
        price: Joi.number().required().min(0),
        description: Joi.string().optional().min(3).max(2000),
        productionTime: Joi.number().required().min(0),
    }),
};
