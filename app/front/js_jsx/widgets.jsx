import React, { PropTypes, Component } from 'react';

class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth + 'px',
      marginLeft: '0px'
    };
  }
  updateDimensions() {
    if (this.props.active.leftActive) {
      this.state = {
        width: window.innerWidth - 260 + 'px',
        marginLeft: '260px'
      };
    } else if (this.props.active.rightActive) {
      this.state = {
        width: window.innerWidth - 260 + 'px',
        marginLeft: '0px'
      };
    } else {
      this.state = {
        width: window.innerWidth + 'px',
        marginLeft: '0px'
      };
    }
  }
  render() {
    this.updateDimensions();
    return <div className="elements-ui-absolute" id="cover-widgets" style={this.state} >
      <div className="container-widgets" id="container-widgets">
        <div id="information-widget" className="widget"/>
        <div id="1h-widget-widget" className="widget"/>
        <div id="24h-widget-widget" className="widget"/>
      </div>
    </div>;
  }
}

Widgets.propTypes = {
  active: PropTypes.object,
  leftActive: PropTypes.bool,
  rightActive: PropTypes.bool,
  state: PropTypes.object,
  widgets: PropTypes.object,
  place: PropTypes.object,
  allId: PropTypes.array
};
export default Widgets;
