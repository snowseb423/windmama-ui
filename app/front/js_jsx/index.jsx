import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './layout.jsx';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { object } from './connect.js';
import reducer from './reducer.js';

const store = createStore(reducer, object, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.querySelector('.app')
);

export default store;
