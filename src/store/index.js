import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import AuthReducer from './Reducers/authReducer';
import DonorReducer from './Reducers/donorReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const middleware = applyMiddleware(thunk);
   

export const rootReducers = combineReducers({
    AuthReducer,
    // DonorReducer
})

export let store = createStore(
    rootReducers,
    middleware
);