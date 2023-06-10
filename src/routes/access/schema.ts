import Joi from 'joi';
import { JoiAuthBearer, JoiObjectId } from '../../helpers/validator';
import { RoleCode } from '../../database/model/Role'

export default {
    credential: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }),
    refreshToken: Joi.object().keys({
        refreshToken: Joi.string().required().min(1),
    }),
    auth: Joi.object()
        .keys({
            authorization: JoiAuthBearer().required(),
        })
        .unknown(true),
    register: Joi.object().keys({
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        roles: Joi.array().items(Joi.string().valid(...Object.values(RoleCode))).required(),
    }),
    userId:Joi.object().keys({
        id: JoiObjectId().required(),
    }),
};
