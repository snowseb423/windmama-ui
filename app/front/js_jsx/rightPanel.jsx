import React, { PropTypes } from 'react';

function RightPanel(props) {
  const active = props.active;
  var Class = ' ';
  if (active == true) {
    Class = ' ';
  } else {
    Class = 'active';
  }
  return <div className={Class} id="right-panel" />;
}

RightPanel.PropTypes = {
  active: PropTypes.bool
};
export default RightPanel;
