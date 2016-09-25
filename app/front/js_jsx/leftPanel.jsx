import React from 'react';

function LeftPanel(props) {
  var active = props.active,
      classPanel = ' ';
  if (active) {
    classPanel = 'clicked';
  } else if (!active) {
    classPanel = ' ';
  }
  return <div className={'left-panel elements-ui-absolute ' + classPanel} id="left-panel" />;
}

export default LeftPanel;
