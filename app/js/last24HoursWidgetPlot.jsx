import React, { PropTypes } from 'react';
import { windColor } from './common.js';

function average(array) {
  var total = 0;
  array.forEach((e)=>{
    total = total + Math.round(Number(e));
  });
  return total / array.length;
}

function Last24HoursWidgetPlot(props) {
  var { index } = props;
  var data = props.data.split('_');
  var avg = [],
      min = [],
      max = [],
      heading = [];
  data.forEach((e, i)=>{
    var d = data[i].split('|');
    min.push(d[2]);
    avg.push(d[3]);
    max.push(d[4]);
    heading.push(d[5]);
  });
  var hour = index == 1 ? data[0].split('|')[1] : Number(data[0].split('|')[1].split(':')[0]) + 1 + 'h';
  var heightSvg = 210;
  var rect = data.map((e, i) => {
    var dataSplited = e.split('|');
    return <g key={i}>
      <rect x={(100 / data.length) * i + '%'} y={heightSvg-((Number(dataSplited[4])/1.852)*3)} width={(100 / data.length) + '%'} height={heightSvg} fill={windColor[Math.round(Number(dataSplited[4])/1.852)]} style={{opacity: 0.4}}/>
      <rect x={(100 / data.length) * i + '%'} y={heightSvg-((Number(dataSplited[3])/1.852)*3)} width={(100 / data.length) + '%'} height={heightSvg} fill={windColor[Math.round(Number(dataSplited[3])/1.852)]} />
      <rect x={(100 / data.length) * i + '%'} y={heightSvg-((Number(dataSplited[2])/1.852)*3)} width={(100 / data.length) + '%'} height={heightSvg} fill={'#ddd'} />
    </g>;
  });

  var lines = <g style={{ stroke: 'rgba(255,255,255,0.4)', strokeWidth: '0,5px'}}>
    <line x1="0" x2="100%" y2={(heightSvg/7)*1} y1={(heightSvg/7)*1}/>
    <line x1="0" x2="100%" y2={(heightSvg/7)*2} y1={(heightSvg/7)*2}/>
    <line x1="0" x2="100%" y2={(heightSvg/7)*3} y1={(heightSvg/7)*3}/>
    <line x1="0" x2="100%" y2={(heightSvg/7)*4} y1={(heightSvg/7)*4}/>
    <line x1="0" x2="100%" y2={(heightSvg/7)*5} y1={(heightSvg/7)*5}/>
    <line x1="0" x2="100%" y2={(heightSvg/7)*6} y1={(heightSvg/7)*6}/>
  </g>;

  var unit = <g fill="white" style={{fontSize: '12px', textShadow: '0px 0px 3px black'}}>
    <text x="2" y={((heightSvg/7)*1)-2}>60</text>
    <text x="2" y={((heightSvg/7)*2)-2}>50</text>
    <text x="2" y={((heightSvg/7)*3)-2}>40</text>
    <text x="2" y={((heightSvg/7)*4)-2}>30</text>
    <text x="2" y={((heightSvg/7)*5)-2}>20</text>
    <text x="2" y={((heightSvg/7)*6)-2}>10</text>
    <text x="2" y={((heightSvg/7)*7)-2}>00</text>
  </g>;

  return <div className="one-plot">
    <svg height={heightSvg} width="100%" style={{shapeRendering: 'crispEdges'}}>
      <line x1="0.5" x2="0.5" y2={heightSvg} y1="0" style={{ strokeDasharray: '2, 1', stroke: 'rgba(255,255,255,0.2)'}}/>
      {rect}
      {lines}
      {index == 1 ? unit : ''}
    </svg>
    <div style={{color: 'white', textAlign: 'left', fontSize: '12px', borderLeft: '1px solid rgba(255,255,255,0.2)', padding: '0 0 0 2px', margin: '0 0 5px 0'}}>{hour}</div>
    <div style={{background: 'rgba(180,180,180,0.5)', paddingTop: '5px'}}>
      <img src="img/windheading.png" style={{margin:'auto', width: '20px', height: '20px', transform: 'rotateZ('+ average(heading) +'deg)' }} />
    </div>
    <div style={{background: windColor[Math.round(average(max)/1.852)] }}>{Math.round(average(max)/1.852)}</div>
    <div style={{background: windColor[Math.round(average(avg)/1.852)] }}>{Math.round(average(avg)/1.852)}</div>
    <div style={{background: windColor[Math.round(average(min)/1.852)] }}>{Math.round(average(min)/1.852)}</div>
  </div>;
}

Last24HoursWidgetPlot.propTypes = {
  data: PropTypes.string,
  index: PropTypes.number
};

export default Last24HoursWidgetPlot;
