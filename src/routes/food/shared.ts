import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import FoodRepo from '../../database/repository/FoodRepo';
import role from '../../helpers/role';

const router = express.Router();

// Admin and waiter can access this route
router.use(
    authentication,
    role(RoleCode.WAITER, RoleCode.ADMIN),
    authorization,
);

router.get(
    '/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const foods = await FoodRepo.findAll();
        return new SuccessResponse('success', foods).send(res);
    }),
);

export default router;
