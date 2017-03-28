import React, { PropTypes } from 'react';
import _ from 'lodash';
import { windColor } from './common.js';

function Last24HourslWidget(props) {
  var { detail, mobile } = props;
  if (detail) {
    var hour = [], heading = [], max = [], avg = [], min = [];
    var tempHour, tempHeading = [], tempMax = [], tempAvg = [], tempMin = [];
    detail.forEach((element) => {
      var splitedElement = element.split('|');
      var splitedHour = splitedElement[1].split(':')[0];
      if (splitedHour !== tempHour && hour) {
        tempHour = splitedHour;
        hour.push(splitedHour);
        heading.push(_.mean(tempHeading)); tempHeading = [];
        max.push(_.mean(tempMax)); tempMax = [];
        avg.push(_.mean(tempAvg)); tempAvg = [];
        min.push(_.mean(tempMin)); tempMin = [];
      } else if (splitedHour === tempHour) {
        tempHeading.push(Number(splitedElement[5]));
        tempMax.push(Number(splitedElement[4]));
        tempAvg.push(Number(splitedElement[3]));
        tempMin.push(Number(splitedElement[2]));
      }
    });

    var Max = 0;
    for(var i = 0; i < max.length; i++) {
      if (max[i] > Max)
        Max = Math.round(max[i]);
    }
    if (Max < 20)
      Max = 30;
    else
      Max += 10;

    var content = <div>
      {hour.map((element, index) => {
        if (index !== 0 && index <= 24) {
          const y2Max = Math.round( Max - max[index] )*2;
          const y1Max = index === 1 ? y2Max : Math.round( Max - max[index-1] )*2;
          const y3Max = y2Max;
          const y4Max = index === 24 ? y2Max : Math.round( Max - max[index+1] )*2;
          const y2Avg = Math.round( Max - avg[index] )*2;
          const y1Avg = index === 1 ? y2Avg : Math.round( Max - avg[index-1] )*2;
          const y3Avg = y2Avg;
          const y4Avg = index === 24 ? y2Avg : Math.round( Max - avg[index+1] )*2;
          const y2Min = Math.round( Max - min[index] )*2;
          const y1Min = index === 1 ? y2Min : Math.round( Max - min[index-1] )*2;
          const y3Min = y2Min;
          const y4Min = index === 24 ? y2Min : Math.round( Max - min[index+1] )*2;
          const svg = <svg style={{ width: '100%', height: Max*2 + 'px', shapeRendering: 'geometricPrecision'}}>
            <line x1={'50%'} x2={'50%'} y1={'0'} y2={Max*2 +'px'} stroke={'rgba(255,255,255,0.4)'} strokeLinecap={'round'} strokeDasharray={'2'}/>
            <line x1={'-50%'} y1={y1Max} x2={'50%'} y2={y2Max} stroke={'#ff226a'} strokeLinecap={'round'} strokeWidth={'2'} />
            <circle cx={'50%'} cy={y2Max} r="5" fill={'#ff226a'} />
            <line x1={'50%'} y1={y3Max} x2={'150%'} y2={y4Max} stroke={'#ff226a'} strokeLinecap={'round'} strokeWidth={'2'} />
            <line x1={'-50%'} y1={y1Avg} x2={'50%'} y2={y2Avg} stroke={'#ffac10'} strokeLinecap={'round'} strokeWidth={'2'} />
            <line x1={'50%'} y1={y3Avg} x2={'150%'} y2={y4Avg} stroke={'#ffac10'} strokeLinecap={'round'} strokeWidth={'2'} />
            <circle cx={'50%'} cy={y2Avg} r="3.5" fill={'#ffac10'} />
            <line x1={'-50%'} y1={y1Min} x2={'50%'} y2={y2Min} stroke={'#5bfa00'} strokeLinecap={'round'} strokeWidth={'2'} />
            <line x1={'50%'} y1={y3Min} x2={'150%'} y2={y4Min} stroke={'#5bfa00'} strokeLinecap={'round'} strokeWidth={'2'} />
            <circle cx={'50%'} cy={y2Min} r="3" fill={'#5bfa00'} />
          </svg>;

          return <div className="one-plot" key={index}>
            { !mobile ? svg : ''}
            <div style={{background: 'rgba(0,0,0,0.55)', padding: '7px 0', color: '#fff', fontSize: '13px'}}>
              { element + 'h' }
            </div>
            <div style={{background: 'rgba(180,180,180,0.5)', paddingTop: '5px'}}>
              <img src="img/windheading.png" alt="" style={{margin:'auto', width: '20px', height: '20px', transform: 'rotateZ('+ heading[index] +'deg)' }}/>
            </div>
            <div style={{background: windColor[Math.round(max[index]/1.852)] }}>{Math.round(max[index]/1.852)}</div>
            <div style={{background: windColor[Math.round(avg[index]/1.852)] }}>{Math.round(avg[index]/1.852)}</div>
            <div style={{background: windColor[Math.round(min[index]/1.852)] }}>{Math.round(min[index]/1.852)}</div>
          </div>;
        } else
          return '';
      })}
    </div>;
  }
  return <div className="container-single-widget">
    <div className="widget" id="widget-24-hours">
      <div className="info-widget">
        Moyennes en nœuds des 24 dernières heures (ex: 17h = de 17h à 18h).
      </div>
      {detail ? content : ''}
    </div>
  </div>;
}

Last24HourslWidget.propTypes = {
  detail: PropTypes.any,
  mobile: PropTypes.bool
};

export default Last24HourslWidget;
