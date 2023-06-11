import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { RoleRequest } from 'app-request';
import crypto from 'crypto';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import User from '../../database/model/User';
import { createTokens } from '../../auth/authUtils';
import validator from '../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import { RoleCode } from '../../database/model/Role';
import { getUserData } from './utils';

const router = express.Router();

router.post(
    '/',
    validator(schema.register),
    asyncHandler(async (req: RoleRequest, res) => {
        const user = await UserRepo.findByEmail(req.body.email);
        if (user) throw new BadRequestError('User already registered');

        // Genera token??
        const accessTokenKey  = crypto.randomBytes(64).toString('hex');
        const refreshTokenKey = crypto.randomBytes(64).toString('hex');

        // Cripta password
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        
        const { user: createdUser, keystore } = await UserRepo.create(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passwordHash,
            } as User,
            accessTokenKey,
            refreshTokenKey,
            req.body.roles,
        );

        const tokens = await createTokens(
            createdUser,
            keystore.primaryKey,
            keystore.secondaryKey,
        );
        const userData = await getUserData(createdUser);

        new SuccessResponse('Signup Successful', {
            user: userData,
            tokens: tokens,
        }).send(res);
    }),
);

export default router;
