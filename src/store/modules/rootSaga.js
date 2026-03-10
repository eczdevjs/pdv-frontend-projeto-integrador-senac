import {all} from 'redux-saga/effects';

import example from './example/sagas';
import auth from './auth/sagas';

export default function* rootSaga(){
    return yield  all([auth]);
}