import { combineReducers } from 'redux';
import auth from './auth';
import empresas from './empresas';
import usuariosReducer from './usuarios';

export default combineReducers({
    auth,
    empresas,
    usuariosReducer,
})