import React from 'react';
import { render } from 'react-dom';
import Layout from './layout.jsx';
import store from './store/store.js';
import { Actions } from './store/actions.js';
import debounce from 'debounce';


var debouceResize = debounce(function() {
  Actions.changeViewport([window.innerWidth, window.innerHeight]);
}, 250);

window.addEventListener('resize', debouceResize);

render(
  <Layout data={store} />,
  document.querySelector('#app')
);
