import { combineReducers } from 'redux';
import auth from './auth';
import empresas from './empresas';

export default combineReducers({
    auth,
    empresas,
})