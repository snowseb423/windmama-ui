import React, { PropTypes } from 'react';
import { unitType, windColor } from './config.js';

function LeftPanelSpot(props) {
  const { place, detail, index, max } = props;
  var detailSplited = detail[0].split('|'),
      id = detailSplited[0],
      heading = -detailSplited[5];
  var placeSplited = place.split('|');
  var city = placeSplited[3];
  var color;
  if (max/1.852 <= 50)
    color = windColor[Math.round((max/1.852)-1)];
  else
    color = windColor[49];
  const styleSpanAverage = {
    color: color,
    float: 'right',
    marginRight: '8px',
    fontWeight: 600
  };
  const styleImgAverage = {
    transform: 'rotateZ(' + heading + 'deg)',
    float: 'right',
    fontWeight: 'bold'
  };
  return <div style={{marginTop: 30 * index + 'px'}} className="child-panel button">
    <span>{city + ' (id:'+ id +')'}</span>
    <img style={styleImgAverage} src="img/windheading.png" width="20px" height="20px" />
    <span style={styleSpanAverage}>{unitType(max)}</span>
  </div>;
}

LeftPanelSpot.propTypes = {
  max: PropTypes.number,
  index: PropTypes.number,
  detail: PropTypes.array,
  place: PropTypes.array
};

export default LeftPanelSpot;
