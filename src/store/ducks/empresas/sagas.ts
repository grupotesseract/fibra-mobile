import { select, call, put, take, fork } from 'redux-saga/effects'
import api, { setToken } from '../../../services/api'
import { empresasFailure } from './actions';
import { Empresa, EmpresasTypes } from './types';

export const getEmpresas = (state) => {
  const { listaEmpresas } = state.empresas;
  console.log("EMPRESAS", listaEmpresas);
  return listaEmpresas;
}

export const getRole = (state) => {
  const { role } = state.auth.data;
  console.log("ROLE", role);
  return role;
}

export const getToken = (state) => {
  const { token } = state.auth.data;
  console.log("TOKEN", token);
  return token;
}

export function* loadEmpresas() {
    try {
        let token = yield select(getToken);
        yield call(setToken, token);
        let role = yield select(getRole);
        console.log("caregando empresas, role:", role)
        let empresas: Empresa[] = [];
        if (role === 'admin') {
          const response = yield call(api.get, '/sync');
          empresas = response.data.data.empresas;
          // empresas = [];
          console.log("Empresas carregadas do backend: ", empresas);
        } else {
          empresas = yield select(getEmpresas);
          console.log("Empresas carregadas da storage: ", empresas);
        }
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