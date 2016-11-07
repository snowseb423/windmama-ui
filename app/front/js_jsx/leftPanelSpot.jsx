import React, { PropTypes } from 'react';
import { unitType, windColor } from './config.js';

function LeftPanelSpot(props) {
  const { index, place, detail } = props;
  var firstDetail = detail[0],
      detailSplited = firstDetail.split(' '),
      average = detailSplited[3],
      heading = -detailSplited[5];
  var color;
  if (average/1.852 <= 50) {
    color = windColor[Math.round((average/1.852)-1)];
  } else {
    color = windColor[49];
  }
  const styleChild = { color: '#DDD' };
  const stylePlace = { fontWeight: '600' };
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

  return <div style={styleChild} className="child-panel button">
    <span style={stylePlace}>{place[3]}</span>
    <img style={styleImgAverage} src="img/windheading.png" width="20px" height="20px" />
    <span style={styleSpanAverage}>{unitType(average)}</span>
  </div>;
}

LeftPanelSpot.propTypes = {
  index: PropTypes.number,
  detail: PropTypes.array,
  place: PropTypes.array
};

export default LeftPanelSpot;
