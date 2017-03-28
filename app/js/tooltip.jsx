import React, { PropTypes } from 'react';
import { windColor } from './common.js';

function color(value) {
  if (value / 1.852 <= 50)
    return windColor[Math.round(( value /1.852))];
  else
    return windColor[49];
}

function Tooltip(props) {
  var { leftActive, detail, hoverId } = props;
  var content;
  detail = detail[hoverId];
  detail = detail.slice(0, 12);
  if (detail) {
    content = detail.map((detail, i) => {
      detail = detail.split('|');
      return <div className="plot" key={i}>
        <div className="mesure">
          <div style={{ background: color(detail[4]), height: detail[4] + 'px' }}/>
          <div style={{ background: color(detail[3]), height: detail[3] + 'px' }}/>
          <div style={{ background: color(detail[2]), height: detail[2] + 'px' }}/>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0', color: '#fff', fontSize: '10px' }}>
          {detail[1]}<br/>{detail[5] + '°'}
        </div>
      </div>;
    });
  }
  return <div id="tooltip2" style={{left: leftActive ? '275px' : '15px'}}>
    {content}
  </div>;
}

Tooltip.propTypes = {
  leftActive: PropTypes.bool,
  detail: PropTypes.any,
  hoverId: PropTypes.any
};

export default Tooltip;
