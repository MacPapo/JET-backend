import Joi from 'joi';
import { JoiObjectId } from '../../helpers/validator';

export default {
    tableCreate: Joi.object().keys({
        number: Joi.number().required().min(0),
        seats: Joi.number().required().min(1),
        isAvailable: Joi.boolean().required(),
    }),
    tableId: Joi.object().keys({
        id: JoiObjectId().required(),
    }),
};
