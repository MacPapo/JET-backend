import express from 'express';
import { SuccessResponse, SuccessMsgResponse } from '../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { BadRequestError, ForbiddenError } from '../../core/ApiError';
import { RoleCode } from '../../database/model/Role';
import { Types } from 'mongoose';
import validator, { ValidationSource } from '../../helpers/validator';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import TableRepo from '../../database/repository/TableRepo';
import Table from '../../database/model/Table';
import role from '../../helpers/role';
import schema from './schema';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(
    authentication,
    role(RoleCode.ADMIN),
    authorization,
);
/*-------------------------------------------------------------------------*/

router.post(
    '/create',
    validator(schema.tableCreate),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const table = await TableRepo.findTableIfExists(req.body.number);
        if (table) throw new BadRequestError('Table with this number already exists');

        const createTable = await TableRepo.create({
            number: req.body.number,
            seats: req.body.seats,
            isAvailable: req.body.isAvailable,
        } as Table);

        new SuccessResponse('Table created successfully', createTable).send(res);
    }),
);

router.get(
    '/list',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const tables = await TableRepo.findAll();
        return new SuccessResponse('success', tables).send(res);
    }),
);

router.delete(
    '/delete/:id',
    validator(schema.tableId, ValidationSource.PARAM),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const table = await TableRepo.findTableById(
            new Types.ObjectId(req.params.id)
        );
        if (!table) throw new BadRequestError('Table with this number does not exists');

        await TableRepo.deleteTable(table._id);
        return new SuccessMsgResponse('Table deleted successfully').send(res);
    }),
);

export default router;
