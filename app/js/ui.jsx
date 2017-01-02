import React, { Component } from 'react';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Widgets from './widgets.jsx';
import Header from './header.jsx';
import store from './store/store.js';

class Ui extends Component {
  constructor(props) {
    super(props);
    this.state = store;
  }
  render() {
    return <div id="ui" className="elements-ui-absolute">
      <Header leftActive={this.state.leftActive} rightActive={this.state.rightActive}/>
      <Widgets />
      <LeftPanel {...this.state} />
      <RightPanel />
    </div>;
  }
}

export default Ui;
