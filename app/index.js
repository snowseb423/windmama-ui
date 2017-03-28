import React from 'react';
import { render } from 'react-dom';
import store from './js/store/store.js';
import { Actions } from './js/store/actions.js';
import debounce from 'debounce';
import ContainerUi from './js/containerUi.jsx';
import ContainerMap from './js/containerMap.jsx';


var debouceResize = debounce(function() {
  Actions.changeViewport([window.innerWidth, window.innerHeight]);
}, 250);
window.addEventListener('resize', debouceResize);


render(
  <div style={{height:'100%'}} >
    <ContainerMap data={store} />
    <ContainerUi data={store} />
  </div>,
  document.getElementById('root')
);
