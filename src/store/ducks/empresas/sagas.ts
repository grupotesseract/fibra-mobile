import { select, call, put, take, fork } from 'redux-saga/effects'
import api, { setToken } from '../../../services/api'
import { empresasFailure } from './actions';
import { Empresa, EmpresasTypes } from './types';
import { Usuario, UsuariosTypes } from '../usuarios/types';

export const getEmpresas = (state) => {
  const { listaEmpresas } = state.empresas;
  return listaEmpresas;
}

export const getUsuarios = (state) => {
  const { listaUsuarios } = state.usuarios;
  return listaUsuarios;
}

export const getRole = (state) => {
  const { role } = state.auth.data;
  return role;
}

export const getToken = (state) => {
  const { token } = state.auth.data;
  return token;
}

export function* loadEmpresas() {
    try {
        let token = yield select(getToken);
        yield call(setToken, token);
        let role = yield select(getRole);
        let empresas: Empresa[] = [];
        let usuarios: Usuario[] = [];
        if (role === 'admin') {
          const response = yield call(api.get, '/sync');
          empresas = response.data.data.empresas;
          usuarios = response.data.data.usuarios;
        } else {
          empresas = yield select(getEmpresas);
          usuarios = yield select(getUsuarios);
        }
        yield put({ type: UsuariosTypes.LOADED, data: [ ...usuarios ]});
        yield put({ type: EmpresasTypes.LOADED, data: [ ...empresas ]});
    } catch (err) {
        console.log("ERR", err)
        yield put(empresasFailure());
    }
}

export function* empresas(params: any = {}) {
  while (true) {
    yield take(EmpresasTypes.UPDATE);
    yield fork(loadEmpresas)
    yield take(EmpresasTypes.ERROR)
  }
}