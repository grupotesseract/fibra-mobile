import { action } from 'typesafe-actions';
import { AuthTypes, Auth, LoginData } from './types';

export const authRequest = (data: LoginData) => action(AuthTypes.AUTH_REQUEST, data)
export const authSuccess = (data: Auth) => action(AuthTypes.AUTH_SUCCESS, { data })
export const authFailure = () => action(AuthTypes.AUTH_FAILURE)