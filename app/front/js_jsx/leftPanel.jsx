import React, { PropTypes } from 'react';

function LeftPanel(props) {
  var active = props.active,
      classPanel = ' ';
  if (active) {
    classPanel = 'clicked';
  } else if (!active) {
    classPanel = ' ';
  }
  return <div className={'elements-ui-absolute ' + classPanel} id="left-panel" />;
}

LeftPanel.propTypes = { active: PropTypes.bool };
export default LeftPanel;
