import { call, take, put, cancelled, fork } from 'redux-saga/effects'
import { setToken, clearToken, login } from '../../../services/api'
import { authSuccess, authFailure, authRequest } from './actions';
import { AuthTypes } from './types';

function* authorize(user, password) {
    try {
        const { token, id, nome, error } = yield call(login, {
            email: user,
            password: password
        });
        console.log("AUTHORIZss", user, password, token,id,nome, error)
        if(error) {
            throw error;
        }
        yield call(setToken, token)
        yield put({ type: AuthTypes.AUTH_SUCCESS, data: { id, nome, token }});
        return token;
    } catch (error) {
        yield call(clearToken)
        yield put(authFailure());
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
    // fork return a Task object
    const task = yield fork(authorize, user, password)
    // const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    const action = yield take(AuthTypes.AUTH_FAILURE)
    // if (action.type === 'LOGOUT')
    //   yield cancel(task)
    yield call(clearToken)
  }
}