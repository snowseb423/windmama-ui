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
  var { data } = props;
  var data = data.split('_');
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

  console.log(average(min) +'?'+ average(avg) +'?'+ average(max) +'?'+ average(heading));

  return <div className="one-plot">
    <div style={{background: 'rgba(180,180,180,0.5)', paddingTop: '5px'}}>
      <img src="img/windheading.png" style={{margin:'auto', width: '20px', height: '20px', transform: 'rotateZ('+ average(heading) +'deg)' }}/>
    </div>
    <div style={{background: windColor[Math.round(average(max)/1.852)] }}>{Math.round(average(max)/1.852)}</div>
    <div style={{background: windColor[Math.round(average(avg)/1.852)] }}>{Math.round(average(avg)/1.852)}</div>
    <div style={{background: windColor[Math.round(average(min)/1.852)] }}>{Math.round(average(min)/1.852)}</div>
  </div>;
}

export default Last24HoursWidgetPlot;
