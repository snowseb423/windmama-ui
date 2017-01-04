import React, { PropTypes } from 'react';
import { unitType, windColor } from './config.js';
import { Actions } from './store/actions.js';


function LeftPanelSpot(props) {
  const { place, detail, max } = props;
  var detailSplited = detail[0].split('|'),
      id = detailSplited[0],
      heading = -detailSplited[5];
  var placeSplited = place.split('|');
  var city = placeSplited[3];
  if (city.search('"') > -1) {
    city = city.split('"')[1];
  }
  var color;
  if (max/1.852 <= 50)
    color = windColor[Math.round((max/1.852))];
  else
    color = windColor[49];
  const styleSpanAverage = {
    color: color,
    float: 'right',
    marginRight: '8px'
  };
  const styleImgAverage = {
    transform: 'rotateZ(' + heading + 'deg)',
    float: 'right'
  };
  return <div style={{ fontSize: '14px', color: '#CCC'}} className="child-panel button" onClick={() => Actions.requestDetailOfId(id)}>
    <span>{city}</span>
    <img style={styleImgAverage} src="img/windheading.png" width="20px" height="20px" />
    <span style={styleSpanAverage}>{unitType(max)}</span>
  </div>;
}

LeftPanelSpot.propTypes = {
  max: PropTypes.number,
  detail: PropTypes.array,
  place: PropTypes.string
};

export default LeftPanelSpot;
