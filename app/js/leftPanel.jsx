import React, { PropTypes } from 'react';
import LeftPanelSpot from './leftPanelSpot.jsx';

function LeftPanel(props) {
  const { detail, place, allId } = props.state;
  var maxOrder = [];
  for (var i = 0; i < allId.length; i++) {
    var max = parseInt(((detail[allId[i]])[0].split('|'))[4]);
    var id = (detail[allId[i]])[0].split('|')[0];
    maxOrder.push({id: id, max: max});
  }
  maxOrder.sort((a, b) => {
    if (a.max < b.max)
      return 1;
    if (a.max > b.max)
      return -1;
    return 0;
  });
  const active = props.active;
  var Class = ' ';
  if (active == true) {
    Class = ' ';
  } else {
    Class = 'active';
  }
  return <div className={Class} id="left-panel">
    <input type="text" placeholder="Recherche"/>
    <div className="container-spot-left-panel">
      {maxOrder.map((item, i) =>
        <LeftPanelSpot key={i} index={i} max={maxOrder[i].max} detail={detail[maxOrder[i].id]} place={place[maxOrder[i].id]} {...item} />
      )}
    </div>
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
