import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { RoleRequest } from 'app-request';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import User from '../../database/model/User';
import validator from '../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import { ProtectedRequest } from 'app-request';
import _ from 'lodash';
import { Types } from 'mongoose';
import { RoleCode } from '../../database/model/Role';
import role from '../../helpers/role';
import authorization from '../../auth/authorization';
import authentication from '../../auth/authentication';
import KeystoreRepo from '../../database/repository/KeystoreRepo';
import { SuccessResponse, SuccessMsgResponse } from '../../core/ApiResponse';

const router = express.Router();

//----------------------------------------------------------------
router.use(authentication, role(RoleCode.ADMIN), authorization);
//----------------------------------------------------------------

router.post(
  '/user/assign',
  validator(schema.credential),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (!user) throw new BadRequestError('User do not exists');

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    await UserRepo.updateInfo({
      _id: user._id,
      password: passwordHash,
    } as User);

    await KeystoreRepo.removeAllForClient(user);

    new SuccessResponse(
      'User password updated',
      _.pick(user, ['_id', 'name', 'email']),
    ).send(res);
  }),
);

router.delete(
    '/user/delete/:id',
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
