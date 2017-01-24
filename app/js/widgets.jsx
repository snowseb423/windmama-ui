import React, { PropTypes } from 'react';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';

function Widgets(props) {
  const { displayDetail, detail, onePlace } = props;
  var content = <div>
    <InfoWidget place={onePlace} />
    <Last2HoursWidget detail={detail[displayDetail]} />
    <Last24HoursWidget detail={detail[displayDetail]} />
  </div>;
  return <div id="cover-widgets" className={displayDetail ? 'active' : ''}>
    <div className="container-widgets" id="container-widgets">
      {displayDetail ? content : ''}
    </div>
  </div>;
}

Widgets.propTypes = {
  displayDetail: PropTypes.any,
  detail: PropTypes.any,
  onePlace: PropTypes.any
};

export default Widgets;
