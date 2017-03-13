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
  detail = detail.slice(0, 48);
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
    return <div className="one-plot" key={i}>
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
        48 derniers relevés de vent en nœuds
      </div>
      {array}
    </div>
  </div>;
}

Last2HoursWidget.propTypes = {
  detail: PropTypes.any
};

export default Last2HoursWidget;
