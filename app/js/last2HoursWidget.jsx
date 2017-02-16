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
  var content;
  if (detail) {
    detail = detail.slice(0, 36);
    content = detail.map((detail, i) => {
      detail = detail.split('|');
      return <div className="one-plot" key={i}>
        <div style={{background: 'rgba(0,0,0,0.55)', padding: '7px 0', color: '#fff', fontSize: '13px'}}>
          { detail[1]}
        </div>
        <div style={{background: 'rgba(180,180,180,0.5)', paddingTop: '5px'}}>
          <img src="img/windheading.png" style={{margin:'auto', width: '20px', height: '20px', transform: 'rotateZ('+ detail[5] +'deg)' }}/>
        </div>
        <div style={{background: color(detail[4]) }}>{ Math.round(detail[4] / 1.852)}</div>
        <div style={{background: color(detail[3]) }}>{ Math.round(detail[3] / 1.852)}</div>
        <div style={{background: color(detail[2]) }}>{ Math.round(detail[2] / 1.852)}</div>
      </div>;
    });
  }
  return <div className="container-single-widget">
    <div className="widget" id="widget-2-hours">
      {content}
    </div>
  </div>;
}

Last2HoursWidget.propTypes = {
  detail: PropTypes.any
};

export default Last2HoursWidget;
