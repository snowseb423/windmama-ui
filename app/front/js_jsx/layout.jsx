import React, { PropTypes } from 'react';
import Header from './header.jsx';
import { connect } from 'react-redux';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Detail from './detail.jsx';
import Map from './map.jsx';

function Layout(props) {
  const styleApp = { height: 100 + '%' };
  return <div style={styleApp}>
    <Header />
    <LeftPanel {...props}/>
    <RightPanel />
    <Detail />
    <Map />
  </div>;
}

Layout.propTypes = {
  state: PropTypes.object.isRequired
};

export default connect( state => {
  return {
    state
  };
})(Layout);
