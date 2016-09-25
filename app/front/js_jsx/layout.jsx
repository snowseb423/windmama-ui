import React from 'react';
import Map from './map.jsx';
import Ui from './ui.jsx';
import Widgets from './widgets.jsx';

function Layout() {
  const styleApp = { height: 100 + '%' };
  return (
    <div style={styleApp}>
      <Ui />
      <Map />
      <Widgets />
    </div>
  );
}

export default Layout;
