import React, { Component } from 'react';
import LeftPanel from './leftPanel.jsx';
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
      <LeftPanel />
      <Widgets />
      <RightPanel />
    </div>;
  }
}

export default Ui;
