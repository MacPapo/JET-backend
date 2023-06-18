import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { OrderStatus } from '../../database/model/Order';

import { ProtectedRequest } from 'app-request';
import { RoleCode } from '../../database/model/Role';
import authentication from '../../auth/authentication';
import authorization from '../../auth/authorization';
import role from '../../helpers/role';


const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(
    authentication,
    role(RoleCode.COOKER, RoleCode.BARTENDER),
    authorization,
);
/*-------------------------------------------------------------------------*/





export default router;
