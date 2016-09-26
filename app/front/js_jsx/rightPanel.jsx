import React, { PropTypes } from 'react';

function RightPanel(props) {
  var active = props.active,
      classPanel = ' ';
  if (active) {
    classPanel = 'clicked';
  } else if (!active) {
    classPanel = ' ';
  }
  return <div className={'right-panel elements-ui-absolute ' + classPanel} id="right-panel" />;
}

RightPanel.propTypes = { active: PropTypes.bool };
export default RightPanel;
