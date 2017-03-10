import React, { PropTypes } from 'react';
import { windColor } from './common.js';

function color(value) {
  if (value / 1.852 <= 50)
    return windColor[Math.round(( value /1.852))];
  else
    return windColor[49];
}

function Last2HoursWidget(props) {
  var { detail } = props;
  var array;
  detail = detail.slice(0, 24);
  var min = [],
      avg = [],
      max = [],
      hour = [],
      heading = [];
  detail.forEach((e) => {
    var eS = e.split('|');
    hour.push(eS[1]);
    min.push(eS[2]);
    avg.push(eS[3]);
    max.push(eS[4]);
    heading.push(eS[5]);
  });
  array = min.map((element, i) => {
    var heightSvg = 210;
    var unit = <g fill="white" style={{fontSize: '12px', textShadow: '0px 0px 3px black'}}>
      <text x="2" y={((heightSvg/7)*1)-2}>60</text>
      <text x="2" y={((heightSvg/7)*2)-2}>50</text>
      <text x="2" y={((heightSvg/7)*3)-2}>40</text>
      <text x="2" y={((heightSvg/7)*4)-2}>30</text>
      <text x="2" y={((heightSvg/7)*5)-2}>20</text>
      <text x="2" y={((heightSvg/7)*6)-2}>10</text>
      <text x="2" y={((heightSvg/7)*7)-2}>00</text>
    </g>;
    return <div className="one-plot" key={i}>
      <svg height={heightSvg} width="100%" style={{shapeRendering: 'geometricPrecision'}}>
        <g style={{ stroke: '#ff226a', strokeWidth: '3px', fill: '#ff226a' }}>
          <line x1={'-50%'} y1={i == 0 ? heightSvg - (Math.round(Number(max[i]) / 1.852) * 3) : heightSvg - (Math.round(Number(max[i-1]) / 1.852) * 3)} x2={'50%'} y2={heightSvg - (Math.round(Number(max[i]) / 1.852) * 3)} />
          <circle cx={'50%'} cy={heightSvg - (Math.round(Number(max[i]) / 1.852) * 3)} r="5" />
          <line x1={'50%'} y1={heightSvg - (Math.round(Number(max[i]) / 1.852) * 3)} x2={'150%'} y2={i == 23 ? heightSvg - (Math.round(Number(max[i]) / 1.852) * 3) : heightSvg - (Math.round(Number(max[i+1]) / 1.852) * 3)} />
        </g>
        <g style={{ stroke: '#ffac10', fill: '#ffac10', strokeWidth: '2px'}}>
          <line x1={'-50%'} y1={i == 0 ? heightSvg - (Math.round(Number(avg[i]) / 1.852) * 3) : heightSvg - (Math.round(Number(avg[i-1]) / 1.852) * 3)} x2={'50%'} y2={heightSvg - (Math.round(Number(avg[i]) / 1.852) * 3)} />
          <circle cx={'50%'} cy={heightSvg - (Math.round(Number(avg[i]) / 1.852) * 3)} r="3.5" />
          <line x1={'50%'} y1={heightSvg - (Math.round(Number(avg[i]) / 1.852) * 3)} x2={'150%'} y2={i == 23 ? heightSvg - (Math.round(Number(avg[i]) / 1.852) * 3) : heightSvg - (Math.round(Number(avg[i+1]) / 1.852) * 3)} />
        </g>
        <g style={{ stroke: '#5bfa00', fill: '#5bfa00', strokeWidth: '1px'}}>
          <line x1={'-50%'} y1={i == 0 ? heightSvg - (Math.round(Number(min[i]) / 1.852) * 3) : heightSvg - (Math.round(Number(min[i-1]) / 1.852) * 3)} x2={'50%'} y2={heightSvg - (Math.round(Number(min[i]) / 1.852) * 3)} />
          <circle cx={'50%'} cy={heightSvg - (Math.round(Number(min[i]) / 1.852) * 3)} r="3" />
          <line x1={'50%'} y1={heightSvg - (Math.round(Number(min[i]) / 1.852) * 3)} x2={'150%'} y2={i == 23 ? heightSvg - (Math.round(Number(min[i]) / 1.852) * 3) : heightSvg - (Math.round(Number(min[i+1]) / 1.852) * 3)} />
        </g>
        <g style={{ stroke: 'rgba(255,255,255,0.4)', strokeWidth: '1px'}}>
          <line x1="0" x2="100%" y2={(heightSvg/7)*1} y1={(heightSvg/7)*1}/>
          <line x1="0" x2="100%" y2={(heightSvg/7)*2} y1={(heightSvg/7)*2}/>
          <line x1="0" x2="100%" y2={(heightSvg/7)*3} y1={(heightSvg/7)*3}/>
          <line x1="0" x2="100%" y2={(heightSvg/7)*4} y1={(heightSvg/7)*4}/>
          <line x1="0" x2="100%" y2={(heightSvg/7)*5} y1={(heightSvg/7)*5}/>
          <line x1="0" x2="100%" y2={(heightSvg/7)*6} y1={(heightSvg/7)*6}/>
          <line x1="0" x2="100%" y2={(heightSvg/7)*7} y1={(heightSvg/7)*7}/>
          <line x1="50%" x2="50%" y2={heightSvg} y1="0" style={{ strokeDasharray: '2, 1', stroke: 'rgba(255,255,255,0.2)'}}/>
        </g>
        {i == 0 ? unit : ''}
      </svg>
      <div style={{background: 'rgba(0,0,0,0.55)', padding: '7px 0', color: '#fff', fontSize: '13px'}}>
        { hour[i] }
      </div>
      <div style={{background: 'rgba(180,180,180,0.5)', paddingTop: '5px'}}>
        <img src="img/windheading.png" style={{margin:'auto', width: '20px', height: '20px', transform: 'rotateZ('+ heading[i] +'deg)' }}/>
      </div>
      <div style={{background: color(max[i]) }}>{ Math.round(Number(max[i]) / 1.852)}</div>
      <div style={{background: color(avg[i]) }}>{ Math.round(Number(avg[i]) / 1.852)}</div>
      <div style={{background: color(min[i]) }}>{ Math.round(Number(min[i]) / 1.852)}</div>
    </div>;
  });
  return <div className="container-single-widget">
    <div className="widget" id="widget-2-hours">
      <div className="info-widget">
        24 derniers relevés de vent en nœuds
      </div>
      {array}
    </div>
  </div>;
}

Last2HoursWidget.propTypes = {
  detail: PropTypes.any
};

export default Last2HoursWidget;
