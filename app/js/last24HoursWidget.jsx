import React, { PropTypes } from 'react';
import _ from 'lodash';


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

    console.log(max);
    var content = <div>
      {max.map((max, index) => {
        if (index != 0 && index <= 24) {
          var y1 = index == 1 ? 100 - 20 : 100 - ( Math.round(max[index-1]) * 2 );
          var y2 = Math.round(100-(max[index]*2));
          var y3 = Math.round(100-(max[index]*2));
          var y4 = Math.round(100-(max[index+1]*2));
          return <div className="one-plot" key={index} style={{ float: 'left', marginTop: '10px', background: 'rgba(0, 0, 0, 0.35)'}}>
            <svg style={{ width: '100%', height: '100px'}}>
              <line x1={'-50%'} y1={y1} x2={'50%'} y2={y2} stroke={'red'} strokeLinecap={'round'} strokeWidth={'1'} />;
              <line x1={'50%'} y1={y3} x2={'150%'} y2={y4} stroke={'red'} strokeLinecap={'round'} strokeWidth={'3'} />;
            </svg>
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
