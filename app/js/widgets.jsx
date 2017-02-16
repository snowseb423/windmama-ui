import React, { PropTypes } from 'react';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';

function Widgets(props) {
  const { displayDetail, detail, onePlace, leftActive, rightActive, mobile } = props;
  var content = <div>
    <InfoWidget place={onePlace} />
    <Last2HoursWidget detail={detail[displayDetail]} />
    <Last24HoursWidget detail={detail[displayDetail]} />
  </div>;

  const containerMargin = {
    marginLeft: leftActive && !mobile ? '260px' : '0px',
    marginRight: rightActive && !mobile ? '260px' : '0px'
  };

  return <div id="cover-widgets" className={displayDetail ? 'active' : ''}>
    <div className="container-widgets" id="container-widgets" style={containerMargin}>
      {displayDetail ? content : ''}
    </div>
  </div>;
}

Widgets.propTypes = {
  mobile: PropTypes.bool,
  leftActive: PropTypes.bool,
  rightActive: PropTypes.bool,
  displayDetail: PropTypes.any,
  detail: PropTypes.any,
  onePlace: PropTypes.any
};

export default Widgets;
