import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import windmamaApp from './reducer.js';
import initialState from './connect.js';

const store = createStore(windmamaApp, initialState, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
