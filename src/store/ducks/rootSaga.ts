import { all, takeLatest, takeEvery, fork } from 'redux-saga/effects'

import { AuthTypes } from './auth/types'
import { auth } from './auth/sagas'
import { EmpresasTypes } from './empresas/types';
import { empresas } from './empresas/sagas';

export default function* rootSaga() {
    yield fork(auth);
    yield fork(empresas);
    // return yield all([
    //     takeEvery(AuthTypes.AUTH_REQUEST, auth),
    //     takeLatest(EmpresasTypes.UPDATE, empresas),
    // ])
}