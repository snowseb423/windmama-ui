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

  var widthContainer;
  var marginLeftContainer;
  if (!leftActive && !rightActive && !mobile) {
    widthContainer = window.innerWidth;
    marginLeftContainer = 0;
  } else if (leftActive && !mobile) {
    widthContainer = (window.innerWidth - 260) + 'px';
    marginLeftContainer = 260;
  } else if (rightActive && !mobile) {
    widthContainer = (window.innerWidth - 260) + 'px';
    marginLeftContainer = 0;
  }

  var heightCoverWidget = {
    height: window.innerHeight - 60 + 'px',
    width: widthContainer,
    marginLeft: marginLeftContainer
  };

  return <div id="cover-widgets" style={heightCoverWidget} className={displayDetail ? 'active' : ''}>
    <div className="container-widgets" id="container-widgets" >
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
