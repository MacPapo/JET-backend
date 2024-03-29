import User, { UserModel } from '../model/User';
import { RoleCode, RoleModel } from '../model/Role';
import { InternalError } from '../../core/ApiError';
import { Types } from 'mongoose';
import KeystoreRepo from './KeystoreRepo';
import Keystore from '../model/Keystore';

async function exists(id: Types.ObjectId): Promise<boolean> {
    const user = await UserModel.exists({ _id: id, status: true });
    return user !== null && user !== undefined;
}

async function findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id })
        .select('+email +password +roles')
        .populate({
            path: 'roles',
            match: { status: true },
        })
        .lean()
        .exec();
}

async function findWaiterUsers(): Promise<User[]> {
    return UserModel.find({ roles: { $elemMatch: { code: 'WAITER' } } }).exec();
}

async function findWaiterById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id })
        .lean()
        .exec();
}

async function findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email })
        .select(
            '+email +password +roles',
        )
        .populate({
            path: 'roles',
            match: { status: true },
            select: { code: 1 },
        })
        .lean()
        .exec();
}

async function findFieldsById(
    id: Types.ObjectId,
    ...fields: string[]
): Promise<User | null> {
    return UserModel.findOne({ _id: id }, [...fields])
        .lean()
        .exec();
}

async function findPublicProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id }).lean().exec();
}

async function create(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
    roleCodes: string[],
): Promise<{ user: User; keystore: Keystore }> {
    const now = new Date();

    const roles = await RoleModel.find({ code: { $in: roleCodes } })
        .select('+code')
        .lean()
        .exec();
    if (!roles) throw new InternalError('Role must be defined');

    user.roles = roles;
    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    const keystore = await KeystoreRepo.create(
        createdUser,
        accessTokenKey,
        refreshTokenKey,
    );
    return {
        user: { ...createdUser.toObject(), roles: user.roles },
        keystore: keystore,
    };
}

async function update(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
): Promise<{ user: User; keystore: Keystore }> {
    user.updatedAt = new Date();
    await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec();
    const keystore = await KeystoreRepo.create(
        user,
        accessTokenKey,
        refreshTokenKey,
    );
    return { user: user, keystore: keystore };
}

async function updateInfo(user: User): Promise<any> {
    user.updatedAt = new Date();
    return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec();
}

async function deleteUser(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findByIdAndDelete(id).lean().exec();
}

export default {
    exists,

    // Waiter only
    findWaiterById,
    findWaiterUsers,
   
    findById,
    findByEmail,
    findFieldsById,
    findPublicProfileById,
    create,
    update,
    updateInfo,
    deleteUser
};
