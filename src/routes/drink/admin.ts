import express from 'express';
import { SuccessResponse, SuccessMsgResponse } from '../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { BadRequestError, ForbiddenError } from '../../core/ApiError';
import { RoleCode } from '../../database/model/Role';
import { Types } from 'mongoose';
import validator, { ValidationSource } from '../../helpers/validator';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import DrinkRepo from '../../database/repository/DrinkRepo';
import Drink from '../../database/model/Drink';
import role from '../../helpers/role';
import schema from './schema';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(
    authentication,
    role(RoleCode.ADMIN),
    authorization,
);
/*-------------------------------------------------------------------------*/

router.post(
    '/create',
    validator(schema.drinkCreate),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const drink = await DrinkRepo.findDrinkIfExists(req.body.name);
        if (drink) throw new BadRequestError('Drink with this name already exists');

        const createDrink = await DrinkRepo.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            productionTime: req.body.productionTime,
        } as Drink);

        new SuccessResponse('Drink created successfully', createDrink).send(res);
    }),
);

export default router;
