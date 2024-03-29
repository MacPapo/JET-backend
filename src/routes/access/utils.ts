import User from '../../database/model/User';
import _ from 'lodash';

export const enum AccessMode {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export async function getUserData(user: User) {
    const data = _.pick(user, ['_id', 'firstName', 'firstName', 'roles']);
  return data;
}
