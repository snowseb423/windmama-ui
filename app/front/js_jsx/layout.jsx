import React, { PropTypes } from 'react';
import Header from './header.jsx';
import { connect } from 'react-redux';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Map from './map.jsx';

function Layout(props) {
  const { detail, location } = props;
  console.log(detail.location);
  const attributes = {
    detail,
    location
  };
  const styleApp = { height: 100 + '%' };
  return <div style={styleApp}>
    <Header />
    <LeftPanel {...attributes} />
    <RightPanel />
    <Map />
  </div>;
}

Layout.propTypes = {
  detail: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default connect( state => {
  return {
    location: state,
    detail: state
  };
})(Layout);
