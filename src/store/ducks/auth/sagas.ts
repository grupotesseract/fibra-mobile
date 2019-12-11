import { select, call, take, put, cancelled, fork } from 'redux-saga/effects'
import { setToken, clearToken, login } from '../../../services/api'
import { authFailure } from './actions';
import { AuthTypes } from './types';

export const getUsuarios = (state) => {
    const { listaUsuarios } = state.usuariosReducer;
    return listaUsuarios;
}

function loginOffline({ usuarios, email, password }) {
    console.log("Usuarios carregados para login offline: ", usuarios);
    const usuario = usuarios.find(u => u.login === email);
    console.log("Usuario logado", usuario);
    return usuario;
}

function* authorize(user, password) {
    try {
        const { token, id, nome, error, role } = yield call(login, {
            email: user,
            password: password
        });
        if (error) {
            throw error;
        }
        yield call(setToken, token)
        yield put({ type: AuthTypes.AUTH_SUCCESS, data: { id, nome, token, role } });
        return token;
    } catch (error) {
        try {
            const usuarios = yield select(getUsuarios);
            const { id, nome, role } = yield call(loginOffline, {
                email: user,
                password,
                usuarios,
            });
            const token = "tokenoffline";
            if ( role === 'admin' ) {
                yield call(clearToken)
                yield put(authFailure());
                return token;
            }
            yield put({ type: AuthTypes.AUTH_SUCCESS, data: { id, nome, role, token } });
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
        yield fork(authorize, user, password)
    }
}