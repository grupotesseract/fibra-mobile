import { call, put } from 'redux-saga/effects'
import api from '../../../services/api'
import { authSuccess, authFailure } from './actions';

export function* auth(params: any) {
    try {
        const { user, password } = params.payload
        const response = yield call(api.post, 'login', {
            "email": user,
            "password": password
        });
        const token = response.data.data.token.token;
        const id = response.data.data.usuario.id;
        const nome = response.data.data.usuario.nome;
        yield put(authSuccess({ id , nome , token }));
    } catch (err) {
        console.log("ERR", err)
        yield put(authFailure());
    }
}