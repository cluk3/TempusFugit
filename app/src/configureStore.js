import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistory, routeReducer } from 'react-router-redux';
import history from './history';
import { clockMiddleware } from './actions/timer/session';
import { app } from '../../config';


const rootReducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));
export const reduxRouterMiddleware = syncHistory(history);

const middlewares =[
  thunkMiddleware,
  reduxRouterMiddleware,
  clockMiddleware
];

if(app.env !== 'production') {
  const createLogger = require('redux-logger');
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

export function configureStore(initialState) {
 return createStore(
    rootReducer,
    initialState,
    compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
 );
}
