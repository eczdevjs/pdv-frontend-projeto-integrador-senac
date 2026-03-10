import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
    const persistedReducer = persistReducer({
        key: "application-name",
        storage,
        whiteList: ['example']
    }, reducers);

    return  persistedReducer;
}