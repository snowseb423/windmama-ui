import React, { PropTypes } from 'react';
import Map from './map.jsx';
import Ui from './ui.jsx';

function Layout(props) {
  console.log(props[417]);
  const styleApp = { height: 100 + '%' };
  return (
    <div style={styleApp}>
      <Ui />
      <Map />
    </div>
  );
}

Layout.propTypes = {
  location: PropTypes.array
};

export default Layout;
