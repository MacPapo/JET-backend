import Joi from 'joi';
import { JoiObjectId } from '../../helpers/validator';

export default {
    tableId: Joi.object().keys({
        id: JoiObjectId().required(),
    }),
    tableCreate: Joi.object().keys({
        number: Joi.number().required().min(0),
        seats: Joi.number().required().min(1),
        isAvailable: Joi.boolean().required(),
    }),
    tableUpdate: Joi.object().keys({
        number: Joi.number().optional().min(0),
        seats: Joi.number().optional().min(1),
        isAvailable: Joi.boolean().optional(),
    }),
    updateStatus: Joi.object().keys({
        isAvailable: Joi.boolean().required(),
    }),
};
