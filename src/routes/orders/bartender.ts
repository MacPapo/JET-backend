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

/*-------------------------------------------------------------------------*/
router.use(
    authentication,
    role(RoleCode.BARTENDER),
    authorization,
);
/*-------------------------------------------------------------------------*/

router.get(
    '/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const orders = await OrderRepo.findAllDetailed();
        new SuccessResponse('Success', orders).send(res);
    }),
);

router.get(
    '/detail/:id',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const order = await cacheGetOrder(
            new Types.ObjectId(req.params.id)
        );
        new SuccessResponse('Success', order).send(res);
    }),
);

export default router;
