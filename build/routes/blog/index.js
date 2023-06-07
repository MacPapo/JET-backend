"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../core/ApiResponse");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const validator_1 = __importStar(require("../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const ApiError_1 = require("../../core/ApiError");
const BlogRepo_1 = __importDefault(require("../../database/repository/BlogRepo"));
const mongoose_1 = require("mongoose");
const writer_1 = __importDefault(require("./writer"));
const editor_1 = __importDefault(require("./editor"));
const BlogCache_1 = __importDefault(require("../../cache/repository/BlogCache"));
const router = express_1.default.Router();
router.use('/writer', writer_1.default);
router.use('/editor', editor_1.default);
router.get('/url', (0, validator_1.default)(schema_1.default.blogUrl, validator_1.ValidationSource.QUERY), (0, asyncHandler_1.default)(async (req, res) => {
    const blogUrl = req.query.endpoint;
    let blog = await BlogCache_1.default.fetchByUrl(blogUrl);
    if (!blog) {
        blog = await BlogRepo_1.default.findPublishedByUrl(blogUrl);
        if (blog)
            await BlogCache_1.default.save(blog);
    }
    if (!blog)
        throw new ApiError_1.NotFoundError('Blog not found');
    return new ApiResponse_1.SuccessResponse('success', blog).send(res);
}));
router.get('/id/:id', (0, validator_1.default)(schema_1.default.blogId, validator_1.ValidationSource.PARAM), (0, asyncHandler_1.default)(async (req, res) => {
    const blogId = new mongoose_1.Types.ObjectId(req.params.id);
    let blog = await BlogCache_1.default.fetchById(blogId);
    if (!blog) {
        blog = await BlogRepo_1.default.findInfoForPublishedById(new mongoose_1.Types.ObjectId(req.params.id));
        if (blog)
            await BlogCache_1.default.save(blog);
    }
    if (!blog)
        throw new ApiError_1.NotFoundError('Blog not found');
    return new ApiResponse_1.SuccessResponse('success', blog).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map