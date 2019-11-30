import { Reducer } from 'redux';
import { UsuariosTypes, UsuariosState } from './types';

const INITIAL_STATE: UsuariosState = {
    listaUsuarios: [],
    error: false,
    loading: false,
}

const usuariosReducer: Reducer<UsuariosState> = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case UsuariosTypes.UPDATE:
            return { ...state, loading: true };
        case UsuariosTypes.LOADED:
            return { 
                ...state, loading: false, error: false, listaUsuarios: action.data, 
            };
        case UsuariosTypes.ERROR:
            return {
                ...state, loading: false, error: true, listaUsuarios: []
            };
        default:
            return state;
    }
}

export default usuariosReducer;