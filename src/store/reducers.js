import { SET_TOKEN, CLEAR_TOKEN } from '../actions';

export default function tokenReducer(state = null, action) {

    switch (action.type) {

        case SET_TOKEN:
            return action.token;

        case CLEAR_TOKEN:
            return null;

        default:
            return state;
    }

}

export default combineReducers({
    token: tokenReducer,
});