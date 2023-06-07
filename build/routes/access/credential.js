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
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const Role_1 = require("../../database/model/Role");
const role_1 = __importDefault(require("../../helpers/role"));
const authorization_1 = __importDefault(require("../../auth/authorization"));
const authentication_1 = __importDefault(require("../../auth/authentication"));
const KeystoreRepo_1 = __importDefault(require("../../database/repository/KeystoreRepo"));
const router = express_1.default.Router();
//----------------------------------------------------------------
router.use(authentication_1.default, (0, role_1.default)(Role_1.RoleCode.ADMIN), authorization_1.default);
//----------------------------------------------------------------
router.post('/user/assign', (0, validator_1.default)(schema_1.default.credential), (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.findByEmail(req.body.email);
    if (!user)
        throw new ApiError_1.BadRequestError('User do not exists');
    const passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
    await UserRepo_1.default.updateInfo({
        _id: user._id,
        password: passwordHash,
    });
    await KeystoreRepo_1.default.removeAllForClient(user);
    new ApiResponse_1.SuccessResponse('User password updated', lodash_1.default.pick(user, ['_id', 'name', 'email'])).send(res);
}));
exports.default = router;
//# sourceMappingURL=credential.js.map