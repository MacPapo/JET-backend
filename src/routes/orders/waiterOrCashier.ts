import express from 'express';
import { Types } from 'mongoose';
import schema from './schema';
import asyncHandler from '../../helpers/asyncHandler';
import OrderRepo from '../../database/repository/OrderRepo';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError'; 
import { SuccessMsgResponse } from '../../core/ApiResponse';
import validator, { ValidationSource } from '../../helpers/validator';
import authentication from '../../auth/authentication';
import { RoleCode } from '../../database/model/Role';
import role from '../../helpers/role';
import authorization from '../../auth/authorization';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(
    authentication,
    role(
        RoleCode.WAITER,
        RoleCode.ADMIN,
        RoleCode.CASHIER
    ),
    authorization,
);
/*-------------------------------------------------------------------------*/

router.delete(
    '/:id',
    validator(schema.orderId, ValidationSource.PARAM),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const order = await OrderRepo.findOrderById(
            new Types.ObjectId(req.params.id)
        );
        if (!order) throw new BadRequestError('Order with this number does not exists');
        await OrderRepo.deleteOrder(order._id);
        return new SuccessMsgResponse('Order deleted successfully').send(res);
    })
);

export default router;
