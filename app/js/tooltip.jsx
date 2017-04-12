import React, { PropTypes } from 'react';
import { knots } from './common.js';

function Tooltip(props) {
  var { leftActive, detail, hoverId, place } = props;
  var content;
  detail = detail[hoverId];
  detail = detail.slice(0, 18);
  if (detail) {
    content = detail.map((e, i) => {
      let now = e;
      let next = i >= 1 ? detail[i-1]: now;
      let prev = i == 17 ? now : detail[i+1];
      let height = 150;
      return <div className="plot" key={i}>
        <svg style={{ width: '100%', height: height, shapeRendering: 'geometricPrecision'}}>
          <circle cx={'50%'} cy={height - (now[4]/1)} r="5" fill={'#ff226a'} />
          <line x1={'-50%'} y1={height - (next[4]/1)} x2={'50%'} y2={height - (now[4]/1)} stroke={'#ff226a'} strokeLinecap={'round'} strokeWidth={'2'} />
          <line x1={'50%'} y1={height - (now[4]/1)} x2={'150%'} y2={height - (prev[4]/1)} stroke={'#ff226a'} strokeLinecap={'round'} strokeWidth={'2'} />
          <text x={'50%'} y={height - (now[4]/1)} style={{fill: '#ff226a', fontSize: '12px', transform: 'translate(-3px, -10px)'}}>{knots(now[4])}</text>
          <circle cx={'50%'} cy={height - (now[3]/1)} r="3.5" fill={'#ffac10'} />
          <line x1={'-50%'} y1={height - (next[3]/1)} x2={'50%'} y2={height - (now[3]/1)} stroke={'#ffac10'} strokeLinecap={'round'} strokeWidth={'2'} />
          <line x1={'50%'} y1={height - (now[3]/1)} x2={'150%'} y2={height - (prev[3]/1)} stroke={'#ffac10'} strokeLinecap={'round'} strokeWidth={'2'} />
          <circle cx={'50%'} cy={height - (now[2]/1)} r="3" fill={'#5bfa00'} />
          <line x1={'-50%'} y1={height - (next[2]/1)} x2={'50%'} y2={height - (now[2]/1)} stroke={'#5bfa00'} strokeLinecap={'round'} strokeWidth={'2'} />
          <line x1={'50%'} y1={height - (now[2]/1)} x2={'150%'} y2={height - (prev[2]/1)} stroke={'#5bfa00'} strokeLinecap={'round'} strokeWidth={'2'} />
        </svg>
        <div style={{ background: 'rgba(255,255,255,0.25)', padding: '0', color: '#fff', textShadow: '0px 0px 2px black' , fontSize: '14px' }}>
          {now[1]}<br/>
          <img src="img/windheading.png" width={20} height={20} style={{transform: 'rotateZ('+ now[5] +'deg)'}} />
        </div>
      </div>;
    });
  }
  const styleLocation = {
    width: 900,
    display: 'inline-block',
    textAlign: 'center',
    marginTop: 1,
    padding: '2px 0',
    background: 'rgba(255,255,255,0.25',
    textShadow: '0px 0px 4px black',
    color: '#fff',
    fontSize: '17px',
    fontWeight: 'bold'
  };
  var cityLocation = place[hoverId][4];
  if (place[hoverId][4].indexOf('Unnamed Road') >= 0)
    cityLocation = place[hoverId][4].substring(13);

  return <div id="tooltip" style={{left: leftActive ? '275px' : '15px'}}>
    {content}
    <div style={styleLocation}>{cityLocation}</div>
  </div>;
}

Tooltip.propTypes = {
  leftActive: PropTypes.bool,
  detail: PropTypes.any,
  hoverId: PropTypes.any,
  place: PropTypes.object
};

export default Tooltip;
