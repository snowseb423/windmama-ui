import React, { PropTypes, Component } from 'react';

class Widgets extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div id="cover-widgets" >
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
