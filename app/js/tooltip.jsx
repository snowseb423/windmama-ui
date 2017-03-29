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
  detail = detail.slice(0, 18);
  if (detail) {
    content = detail.map((e, i) => {
      let now = e.split('|');
      let next = i >= 1 ? detail[i-1].split('|') : now;
      let prev = i == 17 ? now : detail[i+1].split('|');
      let height = 150;
      return <div className="plot" key={i}>
        <svg style={{ width: '100%', height: height, shapeRendering: 'geometricPrecision'}}>
          <circle cx={'50%'} cy={height - (now[4]/1)} r="5" fill={'#ff226a'} />
          <line x1={'-50%'} y1={height - (next[4]/1)} x2={'50%'} y2={height - (now[4]/1)} stroke={'#ff226a'} strokeLinecap={'round'} strokeWidth={'2'} />
          <line x1={'50%'} y1={height - (now[4]/1)} x2={'150%'} y2={height - (prev[4]/1)} stroke={'#ff226a'} strokeLinecap={'round'} strokeWidth={'2'} />
          <text x={'50%'} y={height - (now[4]/1)} style={{fill: '#ff226a', fontSize: '12px', transform: 'translate(-3px, -10px)'}}>{Math.round(now[4]/1.852)}</text>
          <circle cx={'50%'} cy={height - (now[3]/1)} r="3.5" fill={'#ffac10'} />
          <line x1={'-50%'} y1={height - (next[3]/1)} x2={'50%'} y2={height - (now[3]/1)} stroke={'#ffac10'} strokeLinecap={'round'} strokeWidth={'2'} />
          <line x1={'50%'} y1={height - (now[3]/1)} x2={'150%'} y2={height - (prev[3]/1)} stroke={'#ffac10'} strokeLinecap={'round'} strokeWidth={'2'} />
          <circle cx={'50%'} cy={height - (now[2]/1)} r="3" fill={'#5bfa00'} />
          <line x1={'-50%'} y1={height - (next[2]/1)} x2={'50%'} y2={height - (now[2]/1)} stroke={'#5bfa00'} strokeLinecap={'round'} strokeWidth={'2'} />
          <line x1={'50%'} y1={height - (now[2]/1)} x2={'150%'} y2={height - (prev[2]/1)} stroke={'#5bfa00'} strokeLinecap={'round'} strokeWidth={'2'} />
        </svg>
        <div style={{ background: 'rgba(255,255,255,0.25)', padding: '0', color: '#fff', textShadow: '0px 0px 2px black' , fontSize: '14px' }}>
          {now[1]}<br/>
          <img src="img/windheading.png" width={16} height={16} style={{transform: 'rotateZ('+ now[5] +'deg)'}} />
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
