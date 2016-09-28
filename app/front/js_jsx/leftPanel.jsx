import React, { PropTypes } from 'react';

function LeftPanel(props) {
  console.log(props.state);
  return <div className="elements-ui-absolute" id="left-panel" />;
}

LeftPanel.propTypes = {
  state: PropTypes.object
};

export default LeftPanel;
