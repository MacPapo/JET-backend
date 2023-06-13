import express from 'express';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import validator, { ValidationSource } from '../../helpers/validator';
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

router.put(
    '/:id',
    validator(schema.update, ValidationSource.PARAM),
    asyncHandler(async (req: ProtectedRequest, res) => {
        const user = await UserRepo.findById(
            new Types.ObjectId(req.params.id),
        );
        if (!user) throw new BadRequestError('User does not exists');
        
        await UserRepo.updateInfo(user);
        return new SuccessMsgResponse('User updated successfully').send(res);
    }),
);
