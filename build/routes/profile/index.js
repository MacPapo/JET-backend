"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../core/ApiResponse");
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiError_1 = require("../../core/ApiError");
const validator_1 = __importDefault(require("../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const lodash_1 = __importDefault(require("lodash"));
const authentication_1 = __importDefault(require("../../auth/authentication"));
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
router.use(authentication_1.default);
/*-------------------------------------------------------------------------*/
router.get('/my', (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.findPrivateProfileById(req.user._id);
    if (!user)
        throw new ApiError_1.BadRequestError('User not registered');
    return new ApiResponse_1.SuccessResponse('success', lodash_1.default.pick(user, ['firstName', 'lastName', 'email', 'roles'])).send(res);
}));
router.put('/', (0, validator_1.default)(schema_1.default.profile), (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.findPrivateProfileById(req.user._id);
    if (!user)
        throw new ApiError_1.BadRequestError('User not registered');
    if (req.body.firstName)
        user.firstName = req.body.firstName;
    await UserRepo_1.default.updateInfo(user);
    const data = lodash_1.default.pick(user, ['name', 'profilePicUrl']);
    return new ApiResponse_1.SuccessResponse('Profile updated', data).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map