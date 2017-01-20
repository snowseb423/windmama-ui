import React, { PropTypes } from 'react';

function RightPanel(props) {
  return <div className={props.active ? ' ' : 'active'} id="right-panel" />;
}

RightPanel.propTypes = {
  rightActive: PropTypes.bool,
  active: PropTypes.bool
};

export default RightPanel;
