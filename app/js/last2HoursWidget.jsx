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

      var y2Max = Math.round( 100 - ( (detail[4] / 1.852) * 2 ));
      var y1Max = i == 1 ? y2Max : 100 - ( (detail[4] / 1.852) * 2 );
      var y3Max = y2Max;
      var y4Max = i == 24 ? y2Max : Math.round( 100 - ( (detail[4] / 1.852) * 2 ));

      var y2Avg = Math.round( 100 - ( (detail[3] / 1.852) * 2 ));
      var y1Avg = i == 1 ? y2Avg : 100 - ( (detail[3] / 1.852) * 2 );
      var y3Avg = y2Avg;
      var y4Avg = i == 24 ? y2Avg : Math.round( 100 - ( (detail[3] / 1.852) * 2 ));

      var y2Min = Math.round( 100 - ( (detail[2] / 1.852) * 2 ));
      var y1Min = i == 1 ? y2Min : 100 - ( (detail[2] / 1.852) * 2 );
      var y3Min = y2Min;
      var y4Min = i == 24 ? y2Min : Math.round( 100 - ( (detail[2] / 1.852) * 2 ));

      return <div className="one-plot" key={i}>
        <svg style={{ width: '100%', height: '100px'}}>
          <line x1={'50%'} x2={'50%'} y1={'0'} y2={'100px'} stroke={'white'} strokeLinecap={'round'} strokeDasharray={'2'}/>
          <line x1={'-50%'} y1={y1Max} x2={'50%'} y2={y2Max} stroke={'red'} strokeLinecap={'round'} strokeWidth={'2'} />
          <circle cx={'50%'} cy={y2Max} r="4" fill={'red'} />
          <line x1={'50%'} y1={y3Max} x2={'150%'} y2={y4Max} stroke={'red'} strokeLinecap={'round'} strokeWidth={'2'} />
          <line x1={'-50%'} y1={y1Avg} x2={'50%'} y2={y2Avg} stroke={'orange'} strokeLinecap={'round'} strokeWidth={'2'} />
          <line x1={'50%'} y1={y3Avg} x2={'150%'} y2={y4Avg} stroke={'orange'} strokeLinecap={'round'} strokeWidth={'2'} />
          <circle cx={'50%'} cy={y2Avg} r="3" fill={'orange'} />
          <line x1={'-50%'} y1={y1Min} x2={'50%'} y2={y2Min} stroke={'yellow'} strokeLinecap={'round'} strokeWidth={'1'} />
          <line x1={'50%'} y1={y3Min} x2={'150%'} y2={y4Min} stroke={'yellow'} strokeLinecap={'round'} strokeWidth={'1'} />
          <circle cx={'50%'} cy={y2Min} r="2" fill={'yellow'} />
        </svg>
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
