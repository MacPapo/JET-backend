import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import TableRepo from '../../database/repository/TableRepo';
import role from '../../helpers/role';

const router = express.Router();

// Admin, waiter and cashier can access this route
router.use(
    authentication,
    role(RoleCode.WAITER, RoleCode.ADMIN, RoleCode.CASHIER),
    authorization,
);

router.get(
    '/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const tables = await TableRepo.findAll();
        return new SuccessResponse('success', tables).send(res);
    }),
);

export default router;
