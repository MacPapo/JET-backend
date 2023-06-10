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
import FoodRepo from '../../database/repository/FoodRepo';
import Food from '../../database/model/Food';
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
    validator(schema.foodCreate),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const food = await FoodRepo.findFoodIfExists(req.body.name);
        if (food) throw new BadRequestError('Food with this name already exists');

        const createFood = await FoodRepo.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            productionTime: req.body.productionTime,
        } as Food);

        new SuccessResponse('Food created successfully', createFood).send(res);
    }),
);

router.get(
    '/list',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const foods = await FoodRepo.findAll();
        return new SuccessResponse('success', foods).send(res);
    }),
);

router.delete(
    '/delete/:id',
    validator(schema.foodId, ValidationSource.PARAM),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const food = await FoodRepo.findFoodById(
            new Types.ObjectId(req.params.id)
        );
        if (!food) throw new BadRequestError('Food with this number does not exists');

        await FoodRepo.deleteFood(food._id);
        return new SuccessMsgResponse('Food deleted successfully').send(res);
    }),
);


export default router;
