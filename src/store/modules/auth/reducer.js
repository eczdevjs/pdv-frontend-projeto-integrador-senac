import * as types from '../types'
import axios from '../../../services/axios';


const initialState = {
    isLoggedIn: false,
    token: '',
    user: {},
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST: {
            const newState = { ...state };
            newState.isLoading = true;
            return newState;
        }
        case types.LOGIN_SUCCESS: {
            const newState = { ...state };
            newState.isLoggedIn = true;
            newState.token = action.payload.token;
            newState.email = action.payload.email;
            newState.user = action.payload.user;
            newState.isLoading = false;
            return newState;
        }
        case types.LOGIN_FAILURE: {
            delete axios.defaults.Authorization;
            const newState = { ...initialState }
            return newState;
        }
        default:
            return state;
    }
}