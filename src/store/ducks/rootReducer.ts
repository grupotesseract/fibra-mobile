import { combineReducers } from 'redux';
import auth from './auth';
import empresas from './empresas';
import usuariosReducer from './usuarios';
import plantaReducer from './planta';

export default combineReducers({
    auth,
    empresas,
    usuariosReducer,
    plantaReducer,
})