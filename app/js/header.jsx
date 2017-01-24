import React, { PropTypes } from 'react';
import { Actions } from './store/actions.js';

function Header(props) {
  return <div id="header" className="elements-ui-absolute">
    <div className={props.leftActive ? 'container-left-menu button clicked' : 'container-left-menu button'} onClick={() => Actions.leftActivation()}>
      <i className="fa fa-arrow-down" aria-hidden="true" />
    </div>
    <h1>WindMama.fr</h1>
    <div className={props.rightActive ? 'container-right-menu button clicked' : 'container-right-menu button'} onClick={() => Actions.rightActivation()}>
      <div/>
      <div/>
    </div>
  </div>;
}

Header.propTypes = {
  leftActive: PropTypes.bool,
  rightActive: PropTypes.bool
};

export default Header;
