import React, { PropTypes } from 'react';
import _ from 'lodash';
import { windColor } from './common.js';

function Last24HourslWidget(props) {
  var { detail } = props;
  if (detail) {
    var hour = [], heading = [], max = [], avg = [], min = [];
    var tempHour, tempHeading = [], tempMax = [], tempAvg = [], tempMin = [];
    detail.forEach((element) => {
      var splitedElement = element.split('|');
      var splitedHour = splitedElement[1].split(':')[0];
      if (splitedHour != tempHour && hour) {
        tempHour = splitedHour;
        hour.push(splitedHour);
        heading.push(_.mean(tempHeading)); tempHeading = [];
        max.push((_.mean(tempMax))/1.852); tempMax = [];
        avg.push((_.mean(tempAvg))/1.852); tempAvg = [];
        min.push((_.mean(tempMin))/1.852); tempMin = [];
      } else if (splitedHour == tempHour) {
        tempHeading.push(Number(splitedElement[5]));
        tempMax.push(Number(splitedElement[4]));
        tempAvg.push(Number(splitedElement[3]));
        tempMin.push(Number(splitedElement[2]));
      }
    });
    var content = <div>
      {hour.map((element, index) => {
        if (index != 0 && index <= 24) {

          var y2Max = Math.round( 100 - ( max[index] * 2 ));
          var y1Max = index == 1 ? y2Max : 100 - ( max[index-1] * 2 );
          var y3Max = y2Max;
          var y4Max = index == 24 ? y2Max : Math.round( 100 - ( max[index+1] * 2 ));

          var y2Avg = Math.round( 100 - ( avg[index] * 2 ));
          var y1Avg = index == 1 ? y2Avg : 100 - ( avg[index-1] * 2 );
          var y3Avg = y2Avg;
          var y4Avg = index == 24 ? y2Avg : Math.round( 100 - ( avg[index+1] * 2 ));

          var y2Min = Math.round( 100 - ( min[index] * 2 ));
          var y1Min = index == 1 ? y2Min : 100 - ( min[index-1] * 2 );
          var y3Min = y2Min;
          var y4Min = index == 24 ? y2Min : Math.round( 100 - ( min[index+1] * 2 ));

          return <div className="one-plot" key={index}>
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
              { element + 'h' }
            </div>
            <div style={{background: 'rgba(180,180,180,0.5)', paddingTop: '5px'}}>
              <img src="img/windheading.png" style={{margin:'auto', width: '20px', height: '20px', transform: 'rotateZ('+ heading[index] +'deg)' }}/>
            </div>
            <div style={{background: windColor[Math.round(max[index])] }}>{Math.round(max[index])}</div>
            <div style={{background: windColor[Math.round(avg[index])] }}>{Math.round(avg[index])}</div>
            <div style={{background: windColor[Math.round(min[index])] }}>{Math.round(min[index])}</div>
          </div>;
        }
      })}
    </div>;
  }
  return <div className="widget" id="widget-24-hours">
    {detail ? content : ' '}
  </div>;
}

Last24HourslWidget.propTypes = {
  detail: PropTypes.any
};

export default Last24HourslWidget;
