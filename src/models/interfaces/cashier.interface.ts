import { IUser } from './user.interface';

export interface Cashier extends IUser {
    admin: boolean;
}
