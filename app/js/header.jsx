import React, { Component } from 'react';
import store from './store/store.js';
import { Actions, typeOfActions } from './store/actions.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.updateStateMenu = this.updateStateMenu.bind(this);
    this.state = {
      leftActive: store.leftActive,
      rightActive: store.rightActive
    };
  }
  componentDidMount() {
    store.on(typeOfActions.RIGHT_ACTIVATION, this.updateStateMenu);
    store.on(typeOfActions.LEFT_ACTIVATION, this.updateStateMenu);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.RIGHT_ACTIVATION, this.updateStateMenu);
    store.removeListener(typeOfActions.LEFT_ACTIVATION, this.updateStateMenu);
  }
  updateStateMenu() {
    this.setState({
      leftActive: store.leftActive,
      rightActive: store.rightActive
    });
  }
  render() {
    return <div id="header" className="elements-ui-absolute">
      <div className={this.state.leftActive ? 'container-left-menu button clicked' : 'container-left-menu button'} onClick={() => Actions.leftActivation()}>
        <i className="fa fa-arrow-down" aria-hidden="true" />
      </div>
      <h1>WindMama.fr</h1>
      <div className={this.state.rightActive ? 'container-right-menu button clicked' : 'container-right-menu button'} onClick={() => Actions.rightActivation()}>
        <div/>
        <div/>
      </div>
    </div>;
  }
}

export default Header;
