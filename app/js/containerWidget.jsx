import React, { PropTypes } from 'react';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';

function ContainerWidget(props) {
  const { displayDetail, detail, onePlace, leftActive, rightActive, mobile, viewportWidth, viewportHeight } = props;
  var content = <div>
    <InfoWidget place={onePlace} />
    <Last2HoursWidget detail={detail[displayDetail]} />
    <Last24HoursWidget mobile={mobile} detail={detail[displayDetail]} />
  </div>;

  var widthContainer;
  var marginLeftContainer;
  if (!leftActive && !rightActive && !mobile) {
    widthContainer = viewportWidth;
    marginLeftContainer = 0;
  } else if (leftActive && !mobile) {
    widthContainer = (viewportWidth - 260) + 'px';
    marginLeftContainer = 260;
  } else if (rightActive && !mobile) {
    widthContainer = (viewportWidth - 260) + 'px';
    marginLeftContainer = 0;
  }

  var heightCoverWidget = {
    height: viewportHeight - 60 + 'px',
    width: widthContainer,
    marginLeft: marginLeftContainer
  };

  return <div id="cover-widgets" style={heightCoverWidget} className={displayDetail ? 'active' : ''}>
    <div className="container-widgets" id="container-widgets" >
      {displayDetail ? content : ''}
    </div>
  </div>;
}

ContainerWidget.propTypes = {
  mobile: PropTypes.bool,
  leftActive: PropTypes.bool,
  rightActive: PropTypes.bool,
  displayDetail: PropTypes.any,
  detail: PropTypes.any,
  onePlace: PropTypes.any,
  viewportWidth: PropTypes.number,
  viewportHeight: PropTypes.number
};

export default ContainerWidget;
