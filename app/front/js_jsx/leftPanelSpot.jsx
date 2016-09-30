import React, { PropTypes } from 'react';
import { unitType, windColor } from './config.js';

function LeftPanelSpot(props) {
  const { index, place, detail } = props;
  var firstDetail = detail[0],
      detailSplited = firstDetail.split(' '),
      average = detailSplited[3],
      heading = -detailSplited[5];
  const color = windColor[Math.round(unitType(average))];

  const styleChild = {
    color: '#DDD'
  };
  const styleSpanCity = {
    fontStyle: 'italic'
  };
  const styleSpanAverage = {
    color: color,
    float: 'right',
    marginRight: '8px'
  };
  const styleImgAverage = {
    transform: 'rotateZ(' + heading + 'deg)',
    float: 'right',
    fontWeight: 'bold'
  };

  return <div style={styleChild} className="child-panel button">
    <span style={styleSpanCity}>{'Anémomètre - ' + place[0]}</span>
    <img style={styleImgAverage} src="img/windheading.png" width="20px" height="20px" />
    <span style={styleSpanAverage}>{unitType(average) + ' kn'}</span>
  </div>;
}

LeftPanelSpot.propTypes = {
  index: PropTypes.number,
  detail: PropTypes.array,
  place: PropTypes.array
};

export default LeftPanelSpot;
