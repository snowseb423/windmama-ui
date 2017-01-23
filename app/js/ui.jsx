import React, { Component } from 'react';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Widgets from './widgets.jsx';
import Header from './header.jsx';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';

class Ui extends Component {
  constructor(props) {
    super(props);
    this.updateStatePanel = this.updateStatePanel.bind(this);
    this.state = store;
  }
  componentDidMount() {
    store.on(typeOfActions.LEFT_ACTIVATION, this.updateStatePanel);
    store.on(typeOfActions.RIGHT_ACTIVATION, this.updateStatePanel);
    store.on(typeOfActions.UPDATE_DETAIL, this.updateStatePanel);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.LEFT_ACTIVATION, this.updateStatePanel);
    store.removeListener(typeOfActions.RIGHT_ACTIVATION, this.updateStatePanel);
    store.removeListener(typeOfActions.UPDATE_DETAIL, this.updateStatePanel);
  }
  updateStatePanel() {
    this.setState(store);
  }
  render() {
    return <div id="ui" className="elements-ui-absolute">
      <Header />
      <LeftPanel data={this.state} />
      <Widgets data={this.state} />
      <RightPanel />
    </div>;
  }
}

export default Ui;
