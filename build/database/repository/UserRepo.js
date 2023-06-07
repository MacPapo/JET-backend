"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const Role_1 = require("../model/Role");
const ApiError_1 = require("../../core/ApiError");
const KeystoreRepo_1 = __importDefault(require("./KeystoreRepo"));
async function exists(id) {
    const user = await User_1.UserModel.exists({ _id: id, status: true });
    return user !== null && user !== undefined;
}
async function findPrivateProfileById(id) {
    return User_1.UserModel.findOne({ _id: id, status: true })
        .select('+email')
        .populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
    })
        .lean()
        .exec();
}
// contains critical information of the user
async function findById(id) {
    return User_1.UserModel.findOne({ _id: id, status: true })
        .select('+email +password +roles')
        .populate({
        path: 'roles',
        match: { status: true },
    })
        .lean()
        .exec();
}
async function findByEmail(email) {
    return User_1.UserModel.findOne({ email: email })
        .select('+email +password +roles +gender +dob +grade +country +state +city +school +bio +hobbies')
        .populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
    })
        .lean()
        .exec();
}
async function findFieldsById(id, ...fields) {
    return User_1.UserModel.findOne({ _id: id, status: true }, [...fields])
        .lean()
        .exec();
}
async function findPublicProfileById(id) {
    return User_1.UserModel.findOne({ _id: id, status: true }).lean().exec();
}
async function create(user, accessTokenKey, refreshTokenKey, roleCode) {
    const now = new Date();
    const role = await Role_1.RoleModel.findOne({ code: roleCode })
        .select('+code')
        .lean()
        .exec();
    if (!role)
        throw new ApiError_1.InternalError('Role must be defined');
    user.roles = [role];
    user.createdAt = user.updatedAt = now;
    const createdUser = await User_1.UserModel.create(user);
    const keystore = await KeystoreRepo_1.default.create(createdUser, accessTokenKey, refreshTokenKey);
    return {
        user: { ...createdUser.toObject(), roles: user.roles },
        keystore: keystore,
    };
}
async function update(user, accessTokenKey, refreshTokenKey) {
    user.updatedAt = new Date();
    await User_1.UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec();
    const keystore = await KeystoreRepo_1.default.create(user, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
}
async function updateInfo(user) {
    user.updatedAt = new Date();
    return User_1.UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec();
}
exports.default = {
    exists,
    findPrivateProfileById,
    findById,
    findByEmail,
    findFieldsById,
    findPublicProfileById,
    create,
    update,
    updateInfo,
};
//# sourceMappingURL=UserRepo.js.map