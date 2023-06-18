import express from 'express';
import { Types } from 'mongoose';
import schema from './schema';
import asyncHandler from '../../helpers/asyncHandler';
import OrderRepo from '../../database/repository/OrderRepo';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError'; 
import { SuccessResponse, SuccessMsgResponse } from '../../core/ApiResponse';
import validator, { ValidationSource } from '../../helpers/validator';
import authentication from '../../auth/authentication';
import { RoleCode } from '../../database/model/Role';
import role from '../../helpers/role';
import authorization from '../../auth/authorization';
import UserRepo from '../../database/repository/UserRepo';
import DrinkRepo from '../../database/repository/DrinkRepo';
import { OrderStatus } from '../../database/model/Order';
import FoodRepo from '../../database/repository/FoodRepo';
import TableRepo from '../../database/repository/TableRepo';

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

router.put(
    '/:id',
    validator(schema.orderId, ValidationSource.PARAM),
    validator(schema.updateOrder),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const order = await OrderRepo.findOrderById(
            new Types.ObjectId(req.params.id),
        );
        if (!order) { throw new BadRequestError('Order does not exist'); }

        const waiter = await UserRepo.findWaiterById(
            new Types.ObjectId(req.body.waiter)
        );
        if (waiter) { order.waiter = req.body.waiter; }

        const drinks = await DrinkRepo.findByIds(req.body.drinks);
        if (drinks) { order.drinks = req.body.drinks; }

        const foods = await FoodRepo.findByIds(req.body.foods);
        if (foods) { order.foods = req.body.foods; }

        if (req.body.status != order.status &&
            req.body.status in OrderStatus) { order.status = req.body.status; }

        const now = new Date();
        order.updatedAt = now;

        const newTable = req.body.table;
        const table = await TableRepo.findTableIfExists(req.body.table);
        if (newTable && newTable != order.table) {
            if (table &&
                table.isAvailable &&
                table.seats >= req.body.clients) {
                order.table = req.body.table;
                
                table.isAvailable = false;
                const updatedTable = await TableRepo.update(table);
                if (!updatedTable) { throw new BadRequestError('Table could not be updated'); }
            } else {
                throw new BadRequestError('Table is not available or not enough seats');
            }
        }

        if (table && table.seats < req.body.clients) { throw new BadRequestError('Not enough seats'); }
        order.clients = req.body.clients;

        // UPDATE ORDER WITH NEW STATUS
        const updatedOrder = await OrderRepo.update(order);
        if (!updatedOrder) { throw new BadRequestError('Order could not be updated'); }

        new SuccessResponse('Order updated successfully', updatedOrder).send(res);
    }),
);

export default router;
