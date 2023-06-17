import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { OrderStatus } from '../../database/model/Order';
import Order from '../../database/model/Order';
import { BadRequestError } from '../../core/ApiError';
import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import schema from './schema';
import validator, { ValidationSource } from '../../helpers/validator';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import DrinkRepo from '../../database/repository/DrinkRepo';
import FoodRepo from '../../database/repository/FoodRepo';
import OrderRepo from '../../database/repository/OrderRepo';
import UserRepo from '../../database/repository/UserRepo';
import role from '../../helpers/role';
import TableRepo from '../../database/repository/TableRepo';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(
    authentication,
    role(RoleCode.WAITER),
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

router.post(
    '/',
    validator(schema.createOrder),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const table = await TableRepo.findTableIfExists(req.body.table);
        if (!table) { throw new BadRequestError('Table does not exist'); }

        const order = await OrderRepo.findByTable(req.body.table);
        if (order) { throw new BadRequestError('Order already exists'); }

        console.log(await UserRepo.findWaiterUsers());
        const waiter = await UserRepo.findWaiterById(req.body.waiter);
        if (!waiter) { throw new BadRequestError('Waiter does not exist'); }

        console.log(waiter);
        const drinks = await DrinkRepo.findByIds(req.body.drinks);
        if (drinks.length !== req.body.drinks.length) { throw new BadRequestError('Some drinks do not exist'); }

        const foods = await FoodRepo.findByIds(req.body.foods);
        if (foods.length !== req.body.foods.length) { throw new BadRequestError('Some foods do not exist'); }

        const now = new Date();
        const newOrder = await OrderRepo.create({
            clients: req.body.clients,
            table: req.body.table,
            waiter: req.body.waiter,
            drinks: req.body.drinks,
            foods: req.body.foods,
            status: OrderStatus.PENDING,
            createdAt: now,
            updatedAt: now,
        } as Order);

        table.isAvailable = false;
        const updatedTable = await TableRepo.update(table);
        if (!updatedTable) { throw new BadRequestError('Table could not be updated'); }

        new SuccessResponse('Order created successfully', newOrder).send(res);
    }),
);

router.put(
    '/:id',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const order = await OrderRepo.findByTable(parseInt(req.params.id));
        if (!order) { throw new BadRequestError('Order does not exist'); }

        const status = order.status;

        // STATUS FLOW PENDING -> STARTED -> COMPLETED -> SERVED -> DELETED
        switch (status) {
            case OrderStatus.PENDING:
                order.status = OrderStatus.STARTED;
                break;
            case OrderStatus.STARTED:
                order.status = OrderStatus.COMPLETED;
                break;
            case OrderStatus.COMPLETED:
                order.status = OrderStatus.SERVED;
                break;
            default:
                console.log('Order status not valid');
                break;
        }


        if (order.status === OrderStatus.SERVED) {

            // SET TABLE AVAILABLE
            const table = await TableRepo.findTableIfExists(order.table);
            if (!table) { throw new BadRequestError('Table does not exist'); }
            table.isAvailable = true;
            const updatedTable = await TableRepo.update(table);
            if (!updatedTable) { throw new BadRequestError('Table could not be updated'); }

            // DELETE ORDER
            const deletedOrder = await OrderRepo.deleteOrder(order._id);
            if (!deletedOrder) { throw new BadRequestError('Order could not be deleted'); }

            new SuccessResponse('Order deleted successfully', deletedOrder).send(res);
        } else {

            // UPDATE ORDER WITH NEW STATUS
            const updatedOrder = await OrderRepo.update(order);
            if (!updatedOrder) { throw new BadRequestError('Order could not be updated'); }

            new SuccessResponse('Order updated successfully', updatedOrder).send(res);
        }
    }),
);


export default router;
