import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import BillRepo from '../../database/repository/BillRepo';
import role from '../../helpers/role';
import validator from '../../helpers/validator';
import schema from './schema';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(
    authentication,
    role(RoleCode.CASHIER),
    authorization,
);
/*-------------------------------------------------------------------------*/

router.get(
    '/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const bills = await BillRepo.findAll();
        new SuccessResponse('Success', bills).send(res);
    }),
);

router.post(
    '/',
    validator(schema.createBill),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const bill = await BillRepo.create(req.body);
        new SuccessResponse('Success', bill).send(res);
    })
);

export default router;
