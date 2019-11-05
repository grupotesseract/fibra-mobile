import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
    data: {},
    error: false,
    loading: false,
}

const reducer: Reducer<AuthState> = (state = INITIAL_STATE,action) => {
            console.log("action chamada", action)
    switch (action.type) {
        case AuthTypes.AUTH_CHECK:
            return { ...state, loading: true };
        case AuthTypes.AUTH_REQUEST:
            return { ...state, loading: true };
        case AuthTypes.AUTH_SUCCESS:
            return { 
                ...state, loading: false, error: false, data: action.data, 
            };
        case AuthTypes.AUTH_FAILURE:
            return {
                ...state, loading: false, error: true, data: {}
            };
        default:
            return state;
    }
}

export default reducer;