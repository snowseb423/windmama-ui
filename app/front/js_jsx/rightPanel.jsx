import React, { PropTypes } from 'react';

function RightPanel(props) {
  const active = props.active;
  var Class = 'elements-ui-absolute';
  if (active == true) {
    Class = 'elements-ui-absolute';
  } else {
    Class = 'elements-ui-absolute active';
  }
  return <div className={Class} id="right-panel" />;
}

RightPanel.PropTypes = {
  active: PropTypes.bool
};
export default RightPanel;
