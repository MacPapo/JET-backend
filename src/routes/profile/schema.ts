import Joi from 'joi';
import { JoiObjectId } from '../../helpers/validator';

export default {
  userId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  profile: Joi.object().keys({
    firstName: Joi.string().min(1).max(200).optional(),
    lastName: Joi.string().min(1).max(200).optional(),
  }),
};
