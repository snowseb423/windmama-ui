import React, { PropTypes } from 'react';

function LeftPanel(props) {
  const { detail, location } = props.store;
  console.log(detail);
  return <div className="elements-ui-absolute" id="left-panel">
  </div>;
}

LeftPanel.propTypes = {
  store: PropTypes.any,
  detail: PropTypes.array,
  location: PropTypes.array
};

export default LeftPanel;
