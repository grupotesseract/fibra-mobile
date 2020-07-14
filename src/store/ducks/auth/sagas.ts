import { select, call, take, put, cancelled, fork } from 'redux-saga/effects'
import { setToken, clearToken, login } from '../../../services/api'
import { authFailure } from './actions';
import { AuthTypes } from './types';
import NetInfo from '@react-native-community/netinfo';
import * as Crypto from 'expo-crypto';

export const getUsuarios = (state) => {
    const { listaUsuarios } = state.usuariosReducer;
    return listaUsuarios;
}

export const loginOffline = async ({ usuarios, email, password }) => {

  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );

  const usuario = usuarios.find(u => u.login === email && u.passwordsha256 === digest);

  return usuario;

}

function* authorize(user, password) {

  const usuarios = yield select(getUsuarios);

  try {
    const { type, isConnected } = yield call(NetInfo.fetch);

    if (isConnected) {
      const reslogin = yield call(login, {
        email: user,
        password: password
      });
      const { token, id, nome, error, role } = reslogin;
      if (error) {
        throw error;
      }
      yield call(setToken, token);
      yield put({
        type: AuthTypes.AUTH_SUCCESS,
        data: { id, nome, token, role }
      });
    }
    if (!isConnected) {
      const usuarios = yield select(getUsuarios);

      const { id, nome, role } = yield call(loginOffline, {
        email: user,
        password,
        usuarios
      });

      const token = "tokenoffline";
      if (role === "admin") {
        yield call(clearToken);
        yield put(authFailure());
        return token;
      }
      yield put({
        type: AuthTypes.AUTH_SUCCESS,
        data: { id, nome, role, token }
      });
    }
  } catch (error) {
    yield call(clearToken);
    yield put(authFailure());
  } finally {
    if (yield cancelled()) {
      yield call(clearToken);
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
