import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { BadRequestError } from '../../core/ApiError';
import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import OrderRepo from '../../database/repository/OrderRepo';
import role from '../../helpers/role';


const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(
    authentication,
    role(
        RoleCode.WAITER,
        RoleCode.ADMIN,
        RoleCode.CASHIER,
        RoleCode.COOKER,
        RoleCode.BARTENDER
    ),
    authorization,
);
/*-------------------------------------------------------------------------*/

router.get(
    '/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const orders = await OrderRepo.findAll();
        new SuccessResponse('Success', orders).send(res);
    }),
);

router.get(
    '/:tableId',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const order = await OrderRepo.findByTable(parseInt(req.params.tableId));
        if (!order) { throw new BadRequestError('Order does not exist'); }
        new SuccessResponse('Success', order).send(res);
    }),
);

export default router;
