import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { leftActivation, rightActivation } from './store/actions.js';
import store from './store/store.js';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {leftActive, rightActive} = this.props;
    return <div id="header" className="elements-ui-absolute">
      <div className={leftActive ? 'container-left-menu button clicked' : 'container-left-menu button'} onClick={() => store.dispatch(leftActivation())}>
        <i className="fa fa-arrow-down" aria-hidden="true" />
      </div>
      <h1>WindMama.fr</h1>
      <div className={rightActive ? 'container-right-menu button clicked' : 'container-right-menu button'} onClick={() => store.dispatch(rightActivation())}>
        <div/>
        <div/>
      </div>
    </div>;
  }
}
Header.propTypes = {
  state: PropTypes.object.isRequired,
  rightActive: PropTypes.bool,
  leftActive: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    leftActive: state.leftActive,
    rightActive: state.rightActive
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    leftActivation,
    rightActivation
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
