import { fork } from 'redux-saga/effects'

import { auth } from './auth/sagas'
import { empresas } from './empresas/sagas';

export default function* rootSaga() {
    yield fork(auth);
    yield fork(empresas);
}