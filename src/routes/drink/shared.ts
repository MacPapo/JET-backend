import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import DrinkRepo from '../../database/repository/DrinkRepo';
import role from '../../helpers/role';

const router = express.Router();

// FIXME
router.use(
    authentication,
    role(RoleCode.WAITER, RoleCode.ADMIN, RoleCode.COOKER),
    authorization,
);

router.get(
    '/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const drinks = await DrinkRepo.findAll();
        return new SuccessResponse('success', drinks).send(res);
    }),
);

export default router;
