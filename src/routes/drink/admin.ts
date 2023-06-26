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

// All API of this router is protected and available only for logged in users with admin role
router.use(
    authentication,
    role(RoleCode.ADMIN),
    authorization,
);

router.post(
    '/',
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

router.put(
    '/:id',
    validator(schema.drinkId, ValidationSource.PARAM),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const drink = await DrinkRepo.findDrinkById(
            new Types.ObjectId(req.params.id),
        );
        if (!drink) throw new BadRequestError('Drink does not exists');

        if (req.body.name && !(await DrinkRepo.hasSameName(req.body.name)))
                drink.name = req.body.name;
        
        if (req.body.price && drink.price !== req.body.price)
            drink.price = req.body.price

        if (req.body.description && drink.description !== req.body.description)
            drink.description = req.body.description;
        
        if (req.body.productionTime && drink.productionTime !== req.body.productionTime)
            drink.productionTime = req.body.productionTime;

        await DrinkRepo.update(drink);
        return new SuccessMsgResponse('Drink updated successfully').send(res);
    }),
);

router.delete(
    '/:id',
    validator(schema.drinkId, ValidationSource.PARAM),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const drink = await DrinkRepo.findDrinkById(
            new Types.ObjectId(req.params.id)
        );
        if (!drink) throw new BadRequestError('Drink with this number does not exists');

        await DrinkRepo.deleteDrink(drink._id);
        return new SuccessMsgResponse('Drink deleted successfully').send(res);
    }),
);

export default router;
