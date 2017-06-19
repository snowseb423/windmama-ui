import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from './store/actions.js';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      <div id="header" className="elements-ui-absolute">
        <div className={this.props.leftActive ? 'container-left-menu button clicked' : 'container-left-menu button'} onClick={() => Actions.leftActivation()}>
          <i className="fa fa-arrow-down" aria-hidden="true" />
        </div>
        <h1 style={{cursor: 'pointer'}} onClick={() => Actions.displayDetail(false)}>WindMama.fr</h1>
        <div className={this.props.rightActive ? 'container-right-menu button clicked' : 'container-right-menu button'} onClick={() => Actions.rightActivation()}>
          <div/>
          <div/>
        </div>
      </div>
      <div style={{width: '100%', height: '60px'}} />
    </div>;
  }
}

Header.propTypes = {
  leftActive: PropTypes.bool,
  rightActive: PropTypes.bool
};

export default Header;
