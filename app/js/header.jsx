import React, { PropTypes, Component } from 'react';
import { Actions } from './store/actions.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: false,
      left: false
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.rightActive !== this.state.right || nextProps.leftActive !== this.state.left )
      return true;
    else
      return false;
  }
  componentDidUpdate(prevProps) {
    this.setState({
      right: prevProps.rightActive,
      left: prevProps.leftActive
    });
  }
  render() {
    return <div>
      <div id="header" className="elements-ui-absolute">
        <div className={this.state.left ? 'container-left-menu button clicked' : 'container-left-menu button'} onClick={() => Actions.leftActivation()}>
          <i className="fa fa-arrow-down" aria-hidden="true" />
        </div>
        <h1 style={{cursor: 'pointer'}} onClick={() => Actions.displayDetail(false)}>WindMama.fr</h1>
        <div className={this.state.right ? 'container-right-menu button clicked' : 'container-right-menu button'} onClick={() => Actions.rightActivation()}>
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
