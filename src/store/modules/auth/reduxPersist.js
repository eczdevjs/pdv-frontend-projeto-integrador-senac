import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
    const persistedReducer = persistReducer({
        key: "react-api-rest",
        storage,
        whiteList: ['auth']
    }, reducers);

    return  persistedReducer;
}