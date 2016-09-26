import React, { Component } from 'react';

class Header extends Component {
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
    return <div id="header" className="elements-ui-absolute">
      <div className={'container-left-menu button ' + this.state.classLeftMenu} onClick={() => this.leftClick()}>
        <i className="fa fa-arrow-down" aria-hidden="true" />
      </div>
      <h1>WindMama.fr</h1>
      <div className={'container-right-menu button '+ this.state.classRightMenu} onClick={() => this.rightClick()}>
        <div />
        <div />
      </div>
    </div>;
  }
}

export default Header;
