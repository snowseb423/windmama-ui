import React, { PropTypes } from 'react';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';

function ContainerWidgets(props) {
  const { displayDetail, detail, place } = props;
  var content = <div className="container-widgets" id="container-widgets">
    <InfoWidget place={place[displayDetail]} />
    <Last2HoursWidget detail={detail} />
    <Last24HoursWidget detail={detail} />
  </div>;
  return <div id="cover-widgets" className={displayDetail ? 'active' : ''}>
    {displayDetail ? content : ''}
  </div>;
}

ContainerWidgets.propTypes = {
  displayDetail: PropTypes.any,
  detail: PropTypes.any,
  place: PropTypes.any
};

export default ContainerWidgets;
