import { call, take, put, cancelled, fork } from 'redux-saga/effects'
import { setToken, clearToken, login, loginOffline } from '../../../services/api'
import { authSuccess, authFailure, authRequest } from './actions';
import { AuthTypes } from './types';


function* authorize(user, password) {
    try {
        const { token, id, nome, error, role } = yield call(login, {
            email: user,
            password: password
        });
        if(error) {
            throw error;
        }
        yield call(setToken, token)
        yield put({ type: AuthTypes.AUTH_SUCCESS, data: { id, nome, token, role }});
        return token;
    } catch (error) {
        try {
            const { message, success, token, id, nome, role } = yield call(loginOffline, {
                email: user,
                password: password
            });
            if(!success) {
                throw message;
            }
            yield put({ type: AuthTypes.AUTH_SUCCESS, data: { id, nome, token, role }});
        } catch (error) {
            yield call(clearToken)
            yield put(authFailure());
        }
    } finally {
        if (yield cancelled()) {
            yield call(clearToken)
        }
    }
}

export function* auth() {
  while (true) {
    const actions = yield take(AuthTypes.AUTH_REQUEST);
    const { user, password } = actions.payload;
    const token = yield fork(authorize, user, password)
    console.log("TOKEN NO SAGA", token)
  }
}