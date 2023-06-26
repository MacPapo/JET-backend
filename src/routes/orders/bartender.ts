import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import OrderRepo from '../../database/repository/OrderRepo';
import role from '../../helpers/role';
import { cacheGetOrder } from '../../cache/repository/OrderCache';
import { Types } from 'mongoose';

const router = express.Router();

// All API of this router is protected and available only for logged in users with bartender role
router.use(
    authentication,
    role(RoleCode.BARTENDER),
    authorization,
);

router.get(
    '/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const orders = await OrderRepo.findAllDetailed();
        new SuccessResponse('Success', orders).send(res);
    }),
);

export default router;
