import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  data: {},
  error: false,
  loading: false,
}

const auth: Reducer<AuthState> = (state = INITIAL_STATE,action) => {
    switch (action.type) {
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
        case AuthTypes.AUTH_CANCEL:
            return {
                ...state, loading: false, error: false, data: {}
            };
        default:
            return state;
    }
}

export default auth;