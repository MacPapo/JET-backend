"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = 'User';
exports.COLLECTION_NAME = 'users';
const schema = new mongoose_1.Schema({
    firstName: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        maxlength: 200,
    },
    lastName: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        maxlength: 200,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        required: true,
        trim: true,
        select: false,
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        select: false,
    },
    roles: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        required: true,
        select: false,
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        select: false,
    },
    updatedAt: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        select: false,
    },
}, {
    versionKey: false,
});
schema.index({ email: 1 });
exports.UserModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=User.js.map