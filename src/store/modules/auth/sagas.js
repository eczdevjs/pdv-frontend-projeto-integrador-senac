import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from "../../../services/axios";
import history from '../../../services/history';
import {get} from 'lodash';

function* loginRequest({ payload }) {
    try {
        const response = yield call(axios.post, '/tokens', payload);

        yield put(actions.loginSuccess({...response.data}));

        toast.success('Login succeed');

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        history.push(payload.prevPath);


    } catch (error) {
        toast.error('Either email or password invalid');
        yield put(actions.loginFailure());
    }
}

function persistRehydrate({payload}){
    const token = get(payload, 'auth.token', '');
    if(!token) return;

    axios.defaults.headers.Authorization = `Bearer ${token}`

}

function* registerRequest({payload}){
    const {id, name, email, password} = payload;
    console.log("registerRequest, payload: ", payload);

    try {
        if(id){
            yield call(axios.put, '/users',{
                email,
                name,
                password: password || undefined
            });
            toast.success('Account update succeed!');

            yield put(actions.registerUpdatedSuccess({name, email, password}));
        }else {
            yield call(axios.post,'/users',{
                email,
                name,
                password
            } );

            toast.success('Account creation succed!');
            yield put(actions.registerCreatedSuccess({name,email, password}));
            history.push('/login');
        }
        
    } catch (e) {
        const errors = get(e, 'response.data.error', []);
        const status = get(e, 'response.status', 0);
        if(status === 401){
            toast.warning("You are supposed to redo login after update!");
            yield put(actions.loginFailure());
            return history.push('/login')
        }
        console.log(e);
        if(errors.length > 0){
            errors.map(e => toast.error(e))
        } else {
            toast.error('Unknow error');
        }

        yield put(actions.registerFailure());
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest)
]);