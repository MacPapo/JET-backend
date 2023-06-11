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
    role(RoleCode.WAITER, RoleCode.ADMIN, RoleCode.COOKER),
    authorization,
);
/*-------------------------------------------------------------------------*/

router.get(
    '/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const foods = await FoodRepo.findAll();
        return new SuccessResponse('success', foods).send(res);
    }),
);

export default router;
