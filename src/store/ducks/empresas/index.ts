import { Reducer } from 'redux';
import { EmpresasTypes, EmpresasState } from './types';

const INITIAL_STATE: EmpresasState = {
    listaEmpresas: [],
    error: false,
    loading: false,
}

const empresasReducer: Reducer<EmpresasState> = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case EmpresasTypes.UPDATE:
            return { ...state, loading: true };
        case EmpresasTypes.LOADED:
            return { 
                ...state, loading: false, error: false, listaEmpresas: action.data, 
            };
        case EmpresasTypes.ERROR:
            return {
                ...state, loading: false, error: true, listaEmpresas: []
            };
        default:
            return state;
    }
}

export default empresasReducer;