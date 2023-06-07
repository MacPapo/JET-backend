"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../core/ApiError");
exports.default = (permission) => (req, res, next) => {
    try {
        if (!req.apiKey?.permissions)
            return next(new ApiError_1.ForbiddenError('Permission Denied'));
        const exists = req.apiKey.permissions.find((entry) => entry === permission);
        if (!exists)
            return next(new ApiError_1.ForbiddenError('Permission Denied'));
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=permission.js.map