// escrevemos aqui funcoes que representam as acoes que serao disparadas
import * as types from '../types';

export function loginRequest(payload){
    return {
        type: types.LOGIN_REQUEST,
        payload
    }
}

export function loginSuccess(payload){
    return {
        type: types.LOGIN_SUCCESS,
        payload
    }
}

export function loginFailure(payload){
    return {
        type: types.LOGIN_FAILURE,
        payload
    }
}