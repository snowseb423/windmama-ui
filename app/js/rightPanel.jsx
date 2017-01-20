import React, { Component, PropTypes } from 'react';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';


class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.updateStatePanel = this.updateStatePanel.bind(this);
    this.state = {
      active: this.props.rightActive
    };
  }
  componentDidMount() {
    store.on(typeOfActions.RIGHT_ACTIVATION, this.updateStatePanel);
    store.on(typeOfActions.LEFT_ACTIVATION, this.updateStatePanel);
    store.on(typeOfActions.ADD_BOOKMARK, this.addBookmark);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.RIGHT_ACTIVATION, this.updateStatePanel);
    store.removeListener(typeOfActions.LEFT_ACTIVATION, this.updateStatePanel);
    store.removeListener(typeOfActions.ADD_BOOKMARK, this.addBookmark);
  }
  updateStatePanel() {
    this.setState({
      active: store.rightActive
    });
  }
  addBookmark() {
    console.log('cookies :  ' + document.cookie);
    console.log('store   :  ' + store.bookmarks);
  }
  render() {
    return <div className={this.state.active ? ' ' : 'active'} id="right-panel" />;
  }
}

RightPanel.propTypes = {
  rightActive: PropTypes.bool
};

export default RightPanel;
