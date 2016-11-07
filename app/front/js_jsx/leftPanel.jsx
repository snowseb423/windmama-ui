import React, { PropTypes } from 'react';
import LeftPanelSpot from './leftPanelSpot.jsx';

function LeftPanel(props) {
  const { detail, place, allId } = props.state;
  return <div className="elements-ui-absolute" id="left-panel" >
    <input type="text" placeholder="Recherche"/>
    {allId.map((item, i) => <LeftPanelSpot key={i} index={i} detail={detail[allId[i]]} place={place[allId[i]]} {...item} />)}
  </div>;
}

LeftPanel.propTypes = {
  state: PropTypes.object,
  detail: PropTypes.object,
  place: PropTypes.object,
  allId: PropTypes.array
};

export default LeftPanel;
