 import React, { PropTypes, Component } from 'react';


class Widgets extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { leftActive, rightActive } = this.props.active;
    var marginLeft = '0px';
    var styleCover = {
      width: window.innerWidth,
      marginLeft: marginLeft
    };
    if (leftActive === true) {
      styleCover = {
        width: window.innerWidth - 260 + 'px',
        marginLeft: '260px'
      };
    } else if (rightActive === true) {
      styleCover = {
        width: window.innerWidth - 260 + 'px',
        marginLeft: marginLeft
      };
    }
    return <div className="elements-ui-absolute" id="cover-widgets" style={styleCover}>
      <div id="information-widget" className="widget"/>
      <div id="1h-widget-widget" className="widget"/>
      <div id="24h-widget-widget" className="widget"/>
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
