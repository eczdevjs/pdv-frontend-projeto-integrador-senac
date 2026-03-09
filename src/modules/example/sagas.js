import {call, put, all , takeLatest} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions  from './actions';
import * as types from '../types';

const req  = () => new  Promise((res, rej)=> {
    setTimeout(() => {res()}, 600)
});


function* exampleRequest(){
    try {
        yield call(req);
        yield put(actions.buttonClickSuccess());

    } catch (error) {
        toast.error("Ih, deu erro :(")
        yield put(actions.buttonClickFailure());
    }
}

export default all([
    takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)
])