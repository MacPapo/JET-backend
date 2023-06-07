"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../core/ApiResponse");
const crypto_1 = __importDefault(require("crypto"));
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiError_1 = require("../../core/ApiError");
const authUtils_1 = require("../../auth/authUtils");
const validator_1 = __importDefault(require("../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Role_1 = require("../../database/model/Role");
const utils_1 = require("./utils");
const router = express_1.default.Router();
router.post('/basic', (0, validator_1.default)(schema_1.default.signup), (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.findByEmail(req.body.email);
    if (user)
        throw new ApiError_1.BadRequestError('User already registered');
    // Genera token??
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    // Cripta password
    const passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
    const { user: createdUser, keystore } = await UserRepo_1.default.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
    }, accessTokenKey, refreshTokenKey, Role_1.RoleCode.WAITER);
    const tokens = await (0, authUtils_1.createTokens)(createdUser, keystore.primaryKey, keystore.secondaryKey);
    const userData = await (0, utils_1.getUserData)(createdUser);
    new ApiResponse_1.SuccessResponse('Signup Successful', {
        user: userData,
        tokens: tokens,
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=signup.js.map