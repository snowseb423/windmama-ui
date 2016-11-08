import React, { PropTypes } from 'react';
import LeftPanelSpot from './leftPanelSpot.jsx';

function LeftPanel(props) {
  const { detail, place, allId } = props.state;
  const active = props.active;
  var Class = 'elements-ui-absolute';
  if (active == true) {
    Class = 'elements-ui-absolute';
  } else {
    Class = 'elements-ui-absolute active';
  }
  return <div className={Class} id="left-panel">
    <input type="text" placeholder="Recherche"/>
    {allId.map((item, i) => <LeftPanelSpot key={i} index={i} detail={detail[allId[i]]} place={place[allId[i]]} {...item} />)}
  </div>;
}

LeftPanel.propTypes = {
  active: PropTypes.bool,
  state: PropTypes.object,
  allId: PropTypes.array,
  detail: PropTypes.object,
  place: PropTypes.object
};

export default LeftPanel;
