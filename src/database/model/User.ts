import { model, Schema, Types } from 'mongoose';
import Role from './Role';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User {
    _id: Types.ObjectId;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    roles: Role[];
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema<User>(
    {
        firstName: {
            type: Schema.Types.String,
            trim: true,
            maxlength: 200,
        },
        lastName: {
            type: Schema.Types.String,
            trim: true,
            maxlength: 200,
        },
        email: {
            type: Schema.Types.String,
            unique: true,
            required: true,
            trim: true,
            select: false,
        },
        password: {
            type: Schema.Types.String,
            select: false,
        },
        roles: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Role',
                },
            ],
            required: true,
            select: false,
        },
        createdAt: {
            type: Schema.Types.Date,
            required: true,
            select: false,
        },
        updatedAt: {
            type: Schema.Types.Date,
            required: true,
            select: false,
        },
    },
    {
        versionKey: false,
    },
);

schema.index({ email: 1 });

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
