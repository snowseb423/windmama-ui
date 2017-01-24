import React from 'react';
import { render } from 'react-dom';
import Layout from './layout.jsx';
import store from './store/store.js';

render(
  <Layout data={store} />,
  document.querySelector('#app')
);
