//Импортируем все Reducers
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import courseReducer from './courseReducer';
//Соединяем все Reducers
let reducers = combineReducers({
    courseReducer: courseReducer,
})

//Middleware + расширение Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
))

//Передаем Store в Provider который в index.js
export default store

