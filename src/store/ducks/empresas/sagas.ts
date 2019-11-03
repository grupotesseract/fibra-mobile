import { call, put } from 'redux-saga/effects'
import api from '../../../services/api'
import { empresasLoaded, empresasFailure } from './actions';
import { Empresa } from './types';

export function* empresas(params: any = {}) {
    try {
        const response = yield call(api.get, '/empresas');
        const empresas: Empresa[] = response.data.data;
        yield put(empresasLoaded(empresas));
    } catch (err) {
        console.log("ERR", err)
        yield put(empresasFailure());
    }
}