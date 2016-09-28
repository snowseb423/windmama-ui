import React, { PropTypes } from 'react';

function LeftPanel(props) {
  const { detail, location } = props;
  return <div className="elements-ui-absolute" id="left-panel" />;
}

LeftPanel.propTypes = {
  detail: PropTypes.object,
  location: PropTypes.object
};

export default LeftPanel;
