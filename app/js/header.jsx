import React, { Component, PropTypes } from 'react';
import { leftActivation, rightActivation } from './store/actions.js';
import store from './store/store.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftActive: false,
      rightActive: false
    };
  }
  menuClicked(side) {
    if (side === 'left') {
      this.setState({
        leftActive: !this.state.leftActive,
        rightActive: false
      });
      store.dispatch(leftActivation());
    } else {
      this.setState({
        leftActive: false,
        rightActive: !this.state.rightActive
      });
      store.dispatch(rightActivation());
    }
  }
  render() {
    return <div id="header" className="elements-ui-absolute">
      <div className={this.state.leftActive ? 'container-left-menu button clicked' : 'container-left-menu button'} onClick={() => this.menuClicked('left')}>
        <i className="fa fa-arrow-down" aria-hidden="true" />
      </div>
      <h1>WindMama.fr</h1>
      <div className={this.state.rightActive ? 'container-right-menu button clicked' : 'container-right-menu button'} onClick={() => this.menuClicked('right')}>
        <div/>
        <div/>
      </div>
    </div>;
  }
}
Header.propTypes = {
  rightActive: PropTypes.bool,
  leftActive: PropTypes.bool
};

export default Header;
