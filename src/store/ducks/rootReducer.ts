import { combineReducers } from 'redux';
import auth from './auth';
import empresasReducer from './empresas';
import usuariosReducer from './usuarios';
import plantaReducer from './planta';
import programacoesReducer from './programacoes';
import manutencaoRDOReducer from './rdo';

export default combineReducers({
    auth,
    empresasReducer,
    usuariosReducer,
    plantaReducer,
    programacoesReducer,
    manutencaoRDOReducer,
})
