import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import validator, { ValidationSource } from '../../helpers/validator';
import { NotFoundError } from '../../core/ApiError';
import { Types } from 'mongoose';
import admin from './admin';
import shared from './shared';

const router = express.Router();

router.use('/', shared);
router.use('/', admin);

export default router;
