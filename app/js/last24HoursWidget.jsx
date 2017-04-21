import React, { PropTypes } from 'react';
import _ from 'lodash';
import { getColor, knots } from './common.js';

function format2(number) {
  if (number <= 9)
   return '0' + number;
  else
    return number;
}

function Last24HourslWidget(props) {
  var { detail, mobile } = props;
  if (detail) {
    var hour = [], heading = [], max = [], avg = [], min = [];
    var tempHour, tempHeading = [], tempMax = [], tempAvg = [], tempMin = [];
    detail.forEach((e) => {
      let splitedHour = e[1][1].split(':')[0];
      if (splitedHour !== tempHour) {
        tempHour = splitedHour;
        hour.push(splitedHour);
        heading.push(_.mean(tempHeading)); tempHeading = [];
        tempMax.length !== 0 ? max.push(_.mean(tempMax)) : '';
        tempMax = [];
        tempAvg.length !== 0 ? avg.push(_.mean(tempAvg)) : '';
        tempAvg = [];
        tempMin.length !== 0 ? min.push(_.mean(tempMin)) : '';
        tempMin = [];
      } else if (splitedHour === tempHour) {
        tempHeading.push(Number(e[5]));
        tempMax.push(Number(e[4]));
        tempAvg.push(Number(e[3]));
        tempMin.push(Number(e[2]));
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
          let y2Max = Math.round( Max - max[index] )*2,
              y1Max = index === 1 ? y2Max : Math.round( Max - max[index-1] )*2,
              y3Max = y2Max,
              y4Max = index === 24 ? y2Max : Math.round( Max - max[index+1] )*2,
              y2Avg = Math.round( Max - avg[index] )*2,
              y1Avg = index === 1 ? y2Avg : Math.round( Max - avg[index-1] )*2,
              y3Avg = y2Avg,
              y4Avg = index === 24 ? y2Avg : Math.round( Max - avg[index+1] )*2,
              y2Min = Math.round( Max - min[index] )*2,
              y1Min = index === 1 ? y2Min : Math.round( Max - min[index-1] )*2,
              y3Min = y2Min,
              y4Min = index === 24 ? y2Min : Math.round( Max - min[index+1] )*2,
              svg = <svg style={{ background: 'rgba(255,255,255,0.25)', width: '100%', height: Max*2 + 'px', shapeRendering: 'geometricPrecision'}}>
                <line x1={'50%'} x2={'50%'} y1={'0'} y2={Max*2 +'px'} stroke={'rgba(255,255,255,0.4)'} strokeLinecap={'round'} strokeDasharray={'2'}/>
                <line x1={'50%'} y1={y2Max} x2={'150%'} y2={y1Max} stroke={'#ff226a'} strokeLinecap={'round'} strokeWidth={'2'} />
                <circle cx={'50%'} cy={y2Max} r="5" fill={'#ff226a'} />
                <line x1={'-50%'} y1={y4Max} x2={'50%'} y2={y3Max} stroke={'#ff226a'} strokeLinecap={'round'} strokeWidth={'2'} />
                <line x1={'50%'} y1={y2Avg} x2={'150%'} y2={y1Avg} stroke={'#ffac10'} strokeLinecap={'round'} strokeWidth={'2'} />
                <line x1={'-50%'} y1={y4Avg} x2={'50%'} y2={y3Avg} stroke={'#ffac10'} strokeLinecap={'round'} strokeWidth={'2'} />
                <circle cx={'50%'} cy={y2Avg} r="3.5" fill={'#ffac10'} />
                <line x1={'50%'} y1={y2Min} x2={'150%'} y2={y1Min} stroke={'#5bfa00'} strokeLinecap={'round'} strokeWidth={'2'} />
                <line x1={'-50%'} y1={y4Min} x2={'50%'} y2={y3Min} stroke={'#5bfa00'} strokeLinecap={'round'} strokeWidth={'2'} />
                <circle cx={'50%'} cy={y2Min} r="3" fill={'#5bfa00'} />
              </svg>;

          return <div className="one-plot" key={index}>
            { !mobile ? svg : ''}
            <div style={{background: 'rgba(255,255,255,0.25)', padding: '7px 0', color: '#fff',textShadow: '0 0 2px black', fontSize: '13px'}}>
              {element + 'h'}
            </div>
            <div style={{background: 'rgba(180,180,180,0.5)', paddingTop: '5px'}}>
              <img src="img/windheading.png" alt="" style={{margin:'auto', width: '20px', height: '20px', transform: 'rotateZ('+ heading[index] +'deg)' }}/>
            </div>
            <div style={{background: getColor(max[index]) }}>{knots(max[index])}</div>
            <div style={{background: getColor(avg[index]) }}>{knots(avg[index])}</div>
            <div style={{background: getColor(min[index]) }}>{knots(min[index])}</div>
          </div>;
        } else
          return '';
      })}
    </div>;
  }
  return <div className="container-single-widget">
    <div className="widget" id="widget-24-hours">
      <div className="info-widget">
        Moyennes en nœuds des 24 dernières heures (ordre croissant).
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
