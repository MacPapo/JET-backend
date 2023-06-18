import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { OrderStatus } from '../../database/model/Order';
import Order from '../../database/model/Order';
import { BadRequestError } from '../../core/ApiError';
import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import schema from './schema';
import validator from '../../helpers/validator';
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

router.post(
    '/',
    validator(schema.createOrder),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const table = await TableRepo.findTableIfExists(req.body.table);
        if (!table) { throw new BadRequestError('Table does not exist'); }

        if (!table.isAvailable || table.number < req.body.clients) { throw new BadRequestError('Table is not available or not enough seats'); }

        const order = await OrderRepo.findByTable(req.body.table);
        if (order) { throw new BadRequestError('Order already exists'); }

        const waiter = await UserRepo.findWaiterById(req.body.waiter);
        if (!waiter) { throw new BadRequestError('Waiter does not exist'); }

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

export default router;
