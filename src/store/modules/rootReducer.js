import { combineReducers } from "redux";
import exampleReducer from './example/reducer'
import auth from './auth/reducer';


export default combineReducers({
    auth
})