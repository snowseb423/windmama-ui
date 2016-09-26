import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './header.jsx';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Map from './map.jsx';

function Layout(props) {
  const store = props.allData;
  const styleApp = { height: 100 + '%' };
  return <div style={styleApp}>
    <Header />
    <LeftPanel store={store}/>
    <RightPanel />
    <Map />
  </div>;
}

Layout.propTypes = {
  allData: PropTypes.any
};

export default connect( allData => {
  return {
    allData
  };
})(Layout);
