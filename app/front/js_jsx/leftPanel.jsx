import React, { PropTypes } from 'react';
import LeftPanelSpot from './leftPanelSpot.jsx'

function LeftPanel(props) {
  const { detail, place, allId } = props.state;
  return <div className="elements-ui-absolute" id="left-panel" >
    {allId.map((item, i) => <LeftPanelSpot index={i} {...item} />)}
  </div>;
}

LeftPanel.propTypes = {
  state: PropTypes.object
};

export default LeftPanel;
