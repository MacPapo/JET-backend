import express from 'express';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import validator from '../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { Types } from 'mongoose';
import { RoleCode } from '../../database/model/Role';
import role from '../../helpers/role';
import authorization from '../../auth/authorization';
import authentication from '../../auth/authentication';
import { SuccessMsgResponse } from '../../core/ApiResponse';

const router = express.Router();

//----------------------------------------------------------------
router.use(authentication, role(RoleCode.ADMIN), authorization);
//----------------------------------------------------------------


router.delete(
    '/user/:id',
    validator(schema.userId),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const user = await UserRepo.findById(
            new Types.ObjectId(req.params.id)
        );
        if (!user) throw new BadRequestError('User with this number does not exists');

        await UserRepo.deleteUser(user._id);
        return new SuccessMsgResponse('User deleted successfully').send(res);
    }),
);

export default router;
