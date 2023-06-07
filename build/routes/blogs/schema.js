"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validator_1 = require("../../helpers/validator");
exports.default = {
    blogId: joi_1.default.object().keys({
        id: (0, validator_1.JoiObjectId)().required(),
    }),
    blogTag: joi_1.default.object().keys({
        tag: joi_1.default.string().required(),
    }),
    pagination: joi_1.default.object().keys({
        pageNumber: joi_1.default.number().required().integer().min(1),
        pageItemCount: joi_1.default.number().required().integer().min(1),
    }),
    authorId: joi_1.default.object().keys({
        id: (0, validator_1.JoiObjectId)().required(),
    }),
};
//# sourceMappingURL=schema.js.map