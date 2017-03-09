import React, { PropTypes } from 'react';
import Last24HoursWidgetPlot from './last24HoursWidgetPlot.jsx';

function Last24HoursWidget(props) {
  var { detail } = props,
      detailByHour = [],
      tempI = 0,
      tempHour;
  detail.forEach((e) => {
    var hour = e.split('|')[1].split(':')[0];
    if (hour == tempHour) {
      detailByHour[tempI] = detailByHour[tempI] ? detailByHour[tempI] + '_' + e : e;
    } else if (hour != tempHour) {
      tempI++;
      tempHour = hour;
      detailByHour[tempI] = detailByHour[tempI] ? detailByHour[tempI] + '_' + e : e;
    }
  });
  detailByHour = detailByHour.slice(0, 25);

  var content = <div>
    {detailByHour.map((element, index)=>{
      return <Last24HoursWidgetPlot data={element} key={index}/>;
    })}
  </div>;

  return <div className="container-single-widget">
    <div className="widget" id="widget-24-hours">
      <div className="info-widget">
        Moyennes en nœuds des 24 dernières heures.
      </div>
      {detail ? content : ' '}
    </div>
  </div>;
}

Last24HoursWidget.propTypes = {
  detail: PropTypes.any
};

export default Last24HoursWidget;
