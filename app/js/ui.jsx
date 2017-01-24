import React, { PropTypes } from 'react';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Widgets from './widgets.jsx';
import Header from './header.jsx';

function Ui(props) {
  const { leftActive, rightActive, displayDetail, detail, onePlace, place, allId, mobile } = props;

  const propsWidget = { displayDetail, detail, onePlace };
  const propsLeftPanel = { detail, place, allId, leftActive, mobile };
  const propsHeader = { leftActive, rightActive };
  return <div id="ui" className="elements-ui-absolute">
    <Header {...propsHeader}/>
    <LeftPanel {...propsLeftPanel} />
    <Widgets {...propsWidget} />
    <RightPanel active={rightActive} />
  </div>;
}

Ui.propTypes = {
  leftActive: PropTypes.bool,
  rightActive: PropTypes.bool,
  displayDetail: PropTypes.any,
  detail: PropTypes.any,
  place: PropTypes.object,
  onePlace: PropTypes.any,
  allId: PropTypes.array,
  mobile: PropTypes.bool
};

export default Ui;
