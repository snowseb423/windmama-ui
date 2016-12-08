import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Map from './map.jsx';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Widgets from './widgets.jsx';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftActive: false,
      rightActive: false,
      classLeftMenu: ' ',
      classRightMenu: ' '
    };
  }
  leftClick() {
    this.setState({
      leftActive: !this.state.leftActive
    });
    if (this.state.leftActive) {
      this.state.classLeftMenu = ' ';
    } else if (!this.state.leftActive) {
      this.state.classLeftMenu = 'clicked';
      this.state.classRightMenu = ' ';
      this.state.rightActive = false;
    }
  }
  rightClick() {
    this.setState({
      rightActive: !this.state.rightActive
    });
    if (this.state.rightActive) {
      this.state.classRightMenu = ' ';
    } else if (!this.state.rightActive) {
      this.state.classRightMenu = 'clicked';
      this.state.classLeftMenu = ' ';
      this.state.leftActive = false;
    }
  }
  render() {
    const styleApp = { height: 100 + '%' };
    return <div style={styleApp}>
      <Map />
      <div id="ui" className="elements-ui-absolute">
        <div id="header" className="elements-ui-absolute">
          <div className={'container-left-menu button ' + this.state.classLeftMenu} onClick={() => this.leftClick()}>
            <i className="fa fa-arrow-down" aria-hidden="true" />
          </div>
          <h1>WindMama.fr</h1>
          <div className={'container-right-menu button '+ this.state.classRightMenu} onClick={() => this.rightClick()}>
            <div />
            <div />
          </div>
        </div>
        <LeftPanel active={this.state.leftActive} {...this.props} />
        <Widgets active={this.state} />
        <RightPanel active={this.state.rightActive} />
      </div>
    </div>;
  }
}
Layout.propTypes = {
  state: PropTypes.object.isRequired
};

export default connect( state => {
  return {
    state
  };
})(Layout);
