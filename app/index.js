import React from 'react';
import { render } from 'react-dom';
import store from './js/store/store.js';
import { Actions } from './js/store/actions.js';
import debounce from 'debounce';
import ContainerUi from './js/containerUi.jsx';
import ContainerMap from './js/containerMap.jsx';


var resize = debounce( () => {
  Actions.changeViewport([window.innerWidth, window.innerHeight]);
}, 200 );
window.addEventListener('resize', resize);


var pinch = (e) => {
  Actions.pinchLevel(e.scale);
};
window.addEventListener('gesturechange', pinch, false);


render(
  <div style={{height:'100%'}} >
    <ContainerMap data={store} />
    <ContainerUi data={store} />
  </div>,
  document.getElementById('root')
);
