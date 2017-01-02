import React, { Component, PropTypes } from 'react';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';


class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.updateStatePanel = this.updateStatePanel.bind(this);
    this.state = {
      active: this.props.leftActive
    };
  }
  componentDidMount() {
    store.on(typeOfActions.CHANGE_EVENT, this.updateStatePanel);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.CHANGE_EVENT, this.updateStatePanel);
  }
  updateStatePanel() {
    this.setState({
      active: store.leftActive
    });
  }
  render() {
    return <div className={this.state.active ? ' ' : 'active'} id="left-panel" />;
  }
}

LeftPanel.propTypes = {
  leftActive: PropTypes.bool
};

export default LeftPanel;
