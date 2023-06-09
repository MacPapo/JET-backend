import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import validator, { ValidationSource } from '../../helpers/validator';
import { NotFoundError } from '../../core/ApiError';
import { Types } from 'mongoose';
import admin from './admin';

const router = express.Router();

router.use('/admin', admin);

export default router;
