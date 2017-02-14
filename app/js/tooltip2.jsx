import React, { PropTypes } from 'react';
import { windColor } from './common.js';

function color(value) {
  if (value / 1.852 <= 50)
    return windColor[Math.round(( value /1.852))];
  else
    return windColor[49];
}

function Tooltip2(props) {
  var { leftActive, detail, hoverId, place } = props;
  var placeSplited = place[hoverId].split('|');
  place = placeSplited[3] +', '+ 'Pioupiou: ' + placeSplited[0];
  var content;
  detail = detail[hoverId];
  if (detail) {
    detail = detail.slice(0, 10);
    content = detail.map((detail, i) => {
      detail = detail.split('|');
      return <div className="plot" key={i}>
        <div className="mesure">
          <div style={{ background: color(detail[4]), height: detail[4] + 'px' }}/>
          <div style={{ borderTop: 'solid 1.5px'+ color(detail[3]), height: detail[3] + 'px' }}/>
          <div style={{ borderTop: 'solid 1.5px'+ color(detail[2]), height: detail[2] + 'px' }}/>
        </div>
        <div style={{paddingTop: '5px', background: 'rgba(0,0,0,0.4)'}}>
          <img src="img/windheading.png" style={{margin:'auto', width: '20px', height: '20px', transform: 'rotateZ('+ detail[5] +'deg)' }}/>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0 0 7px 0', color: '#fff', fontSize: '13px', borderBottom: '1px solid rgba(0,0,0,0.2)'}}> {detail[1]} </div>
      </div>;
    });
  }
  return <div id="tooltip2" style={{left: leftActive ? '275px' : '15px'}}>
    {content}
    <p>{place}</p>
  </div>;
}

Tooltip2.propTypes = {
  leftActive: PropTypes.bool,
  detail: PropTypes.any,
  hoverId: PropTypes.any,
  place: PropTypes.object
};

export default Tooltip2;
