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
      let height = 140;
      return <div className="plot" key={i}>
        <svg style={{ width: '100%', height: height + 'px', shapeRendering: 'geometricPrecision'}}>
          <circle cx={'50%'} cy={height - detail[4]} r="5" fill={'#ff226a'} />
          <circle cx={'50%'} cy={height - detail[3]} r="3.5" fill={'#ffac10'} />
          <circle cx={'50%'} cy={height - detail[2]} r="3" fill={'#5bfa00'} />
        </svg>;
        <div style={{ background: '#1f1f1f', padding: '0', color: '#fff', fontSize: '10px' }}>
          {detail[1]}<br/>{detail[5] + '°'}
        </div>
      </div>;
    });
  }
  return <div id="tooltip" style={{left: leftActive ? '275px' : '15px'}}>
    {content}
  </div>;
}

Tooltip.propTypes = {
  leftActive: PropTypes.bool,
  detail: PropTypes.any,
  hoverId: PropTypes.any
};

export default Tooltip;
