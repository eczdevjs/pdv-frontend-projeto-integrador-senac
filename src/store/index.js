import {persistStore} from "redux-persist"
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../store/modules/rootReducer';
import rootSaga from '../store/modules/rootSaga';

import persistedReducer from "../modules/example/reduxPersist";



const sagaMiddleware = createSagaMiddleware();


const store = createStore(
    persistedReducer(rootReducer), 
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)


export const persistor = persistStore(store);
export default store;
