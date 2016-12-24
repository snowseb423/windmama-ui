import React from 'react';
import Map from './map.jsx';
import Ui from './ui.jsx';

function Layout() {
  const styleApp = {height:'100%'};
  return <div style={styleApp}>
    <Map />
    <Ui />
  </div>;
}

export default Layout;
