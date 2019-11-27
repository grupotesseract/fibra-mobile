import { call, put, take, fork } from 'redux-saga/effects'
import api from '../../../services/api'
import { empresasLoaded, empresasFailure } from './actions';
import { Empresa, EmpresasTypes } from './types';

export function* loadEmpresas() {
    try {
        const response = yield call(api.get, '/empresas');
        const empresas: Empresa[] = response.data.data;
        console.log("Empresas carregadas do backend: ", empresas);
        yield put(empresasLoaded(empresas));
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