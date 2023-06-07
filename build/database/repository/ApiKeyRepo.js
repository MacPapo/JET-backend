"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiKey_1 = require("../model/ApiKey");
async function findByKey(key) {
    return ApiKey_1.ApiKeyModel.findOne({ key: key, status: true }).lean().exec();
}
exports.default = {
    findByKey,
};
//# sourceMappingURL=ApiKeyRepo.js.map