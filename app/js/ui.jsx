import React, { Component } from 'react';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import ContainerWidgets from './containerWidgets.jsx';
import Header from './header.jsx';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';

class Ui extends Component {
  constructor(props) {
    super(props);
    this.displayDetail = this.displayDetail.bind(this);
    this.updateStatePanel = this.updateStatePanel.bind(this);
    this.state = store;
  }
  componentDidMount() {
    store.on(typeOfActions.DISPLAY_DETAIL, this.displayDetail);
    store.on(typeOfActions.LEFT_ACTIVATION, this.updateStatePanel);
    store.on(typeOfActions.RIGHT_ACTIVATION, this.updateStatePanel);
    store.on(typeOfActions.UPDATE_DETAIL, this.updateStatePanel);
  }
  updateStatePanel() {
    this.setState(store);
  }
  displayDetail() {
    if(store.displayDetail) {
      this.setState({
        displayDetail: store.displayDetail,
        detail: store.detail[store.displayDetail],
        place: store.place[store.displayDetail]
      });
    } else {
      this.setState({
        displayDetail: false,
        detail: false,
        place: false
      });
    }
  }
  render() {
    return <div id="ui" className="elements-ui-absolute">
      <Header rightActive={this.state.rightActive} leftActive={this.state.leftActive}/>
      <LeftPanel {...this.state}/>
      <ContainerWidgets {...this.state}/>
      <RightPanel active={this.state.rightActive} />
    </div>;
  }
}

export default Ui;
