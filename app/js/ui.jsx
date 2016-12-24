import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Widgets from './widgets.jsx';
import Header from './header.jsx';

class Ui extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div id="ui" className="elements-ui-absolute">
      <Header />
      <Widgets />
      <RightPanel />
    </div>;
  }
}
Ui.propTypes = {
  state: PropTypes.object.isRequired
};

export default connect()(Ui);


// <LeftPanel {...this.props} />
