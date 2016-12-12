import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Map from './map.jsx';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Widgets from './widgets.jsx';
import Header from './header.jsx';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styleApp = {height:'100%'};
    return <div style={styleApp}>
      <Map />
      <div id="ui" className="elements-ui-absolute">
        <Header />
        <LeftPanel {...this.props} />
        <Widgets />
        <RightPanel />
      </div>
    </div>;
  }
}
Layout.propTypes = {
  state: PropTypes.object.isRequired
};

export default connect( state => {
  return {
    state
  };
})(Layout);
