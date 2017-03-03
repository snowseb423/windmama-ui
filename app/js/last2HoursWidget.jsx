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

    var Max = 0;
    detail.map((detail) => {
      detail = detail.split('|');
      if (detail[4] > Max)
        Max = Math.round(detail[4]);
    });
    if (Max < 20)
      Max = 24;
    else
      Max = Max + 4;

    content = detail.map((detail, i) => {
      detail = detail.split('|');
      return <div className="one-plot" key={i}>
        <div className="mesure" style={{height: Max*1.65 + 'px'}}>
          <div style={{background: color(detail[2]), height: Math.round(detail[2]) != 0 ? Math.round(detail[2])*1.65 : 1 }} />
          <div style={{background: color(detail[3]), height: Math.round(detail[3]) != 0 ? Math.round(detail[3])*1.65 : 1 }} />
          <div style={{background: color(detail[4]), height: Math.round(detail[4]) != 0 ? Math.round(detail[4])*1.65 : 1 }} />
        </div>
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
      <div className="info-widget">
        36 derniers relevés de vent en nœuds
      </div>
      {content}
    </div>
  </div>;
}

Last2HoursWidget.propTypes = {
  detail: PropTypes.any
};

export default Last2HoursWidget;
