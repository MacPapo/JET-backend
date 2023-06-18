import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import OrderRepo from '../../database/repository/OrderRepo';
import role from '../../helpers/role';
import validator from '../../helpers/validator';
import schema from './schema';
import { ValidationSource } from '../../helpers/validator';
import { Types } from 'mongoose';
import { BadRequestError } from '../../core/ApiError';
import { OrderStatus } from '../../database/model/Order';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(
    authentication,
    role(RoleCode.COOKER),
    authorization,
);
/*-------------------------------------------------------------------------*/

router.get(
    '/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const orders = await OrderRepo.findAllOrderedFoods();
        new SuccessResponse('Success', orders).send(res);
    }),
);

router.put(
    '/:id',
    validator(schema.orderId, ValidationSource.PARAM),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const order = await OrderRepo.findOrderById(
            new Types.ObjectId(req.params.id),
        );
        if (!order) { throw new BadRequestError('Order does not exist'); }

        const currentStatus = order.status;

        const possibleStatus = [
            OrderStatus.PENDING,
            OrderStatus.STARTED,
            OrderStatus.COMPLETED
        ];

        if (!possibleStatus.includes(currentStatus)) { throw new BadRequestError('Order status cannot be updated'); }

        // STATUS FLOW PENDING -> STARTED -> COMPLETED -> SERVED -> DELETED
        switch (currentStatus) {
            case OrderStatus.PENDING:
                order.status = OrderStatus.STARTED;
                break;
            case OrderStatus.STARTED:
                order.status = OrderStatus.COMPLETED;
                break;
            case OrderStatus.COMPLETED:
                throw new BadRequestError('Order status already completed');
            default:
                throw new BadRequestError('Order invalid status');
        }
        
        // UPDATE ORDER WITH NEW STATUS
        const updatedOrder = await OrderRepo.update(order);
        if (!updatedOrder) { throw new BadRequestError('Order could not be updated'); }

        new SuccessResponse('Order updated successfully', updatedOrder).send(res);
    }),
);

export default router;
