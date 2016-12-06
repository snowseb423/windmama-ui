import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './layout.jsx';
import store from './store/store.js';

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.querySelector('.app')
);
