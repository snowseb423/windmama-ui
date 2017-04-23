import React, { PropTypes } from 'react';
import { getColor, knots } from './common.js';
import moment from 'moment';

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
    hour.push(moment(e[1], moment.ISO_8601).format('HH:mm'));
    min.push(e[2]);
    avg.push(e[3]);
    max.push(e[4]);
    heading.push(e[5]);
  });
  array = min.map((element, i) => {
    return <div className="one-plot" key={i}>
      <div style={{background: 'rgba(255,255,255,0.25)', padding: '7px 0', color: '#fff',textShadow: '0 0 2px black', fontSize: '13px'}}>
        { hour[i] }
      </div>
      <div style={{background: 'rgba(180,180,180,0.5)', paddingTop: '5px'}}>
        <img src="img/windheading.png" alt="" style={{margin:'auto', width: '20px', height: '20px', transform: 'rotateZ('+ heading[i] +'deg)' }}/>
      </div>
      <div style={{background: getColor(max[i]) }}>{knots(max[i])}</div>
      <div style={{background: getColor(avg[i]) }}>{knots(avg[i])}</div>
      <div style={{background: getColor(min[i]) }}>{knots(min[i])}</div>
    </div>;
  });
  return <div className="container-single-widget">
    <div className="widget" id="widget-2-hours">
      <div className="info-widget">
        48 derniers relevés de vent en nœuds (ordre décroissant)
      </div>
      {array}
    </div>
  </div>;
}

Last2HoursWidget.propTypes = {
  detail: PropTypes.any
};

export default Last2HoursWidget;
