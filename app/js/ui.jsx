import React, { PropTypes } from 'react';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import Widgets from './widgets.jsx';
import Header from './header.jsx';
import Tooltip2 from './tooltip2.jsx';

function Ui(props) {
  const { leftActive, rightActive, displayDetail, detail, onePlace, place, allId, mobile, hoverId, viewportWidth, viewportHeight } = props;
  const propsWidget = { displayDetail, detail, onePlace, leftActive, rightActive, mobile, viewportWidth, viewportHeight };
  const propsLeftPanel = { displayDetail, detail, place, allId, leftActive, mobile, viewportHeight };
  const propsHeader = { leftActive, rightActive };
  const propsTooltip2 = { hoverId, leftActive, detail, place };
  return <div id="ui" className="elements-ui-absolute">
    <Header {...propsHeader}/>
    <LeftPanel {...propsLeftPanel} />
    <Widgets {...propsWidget} />
    {hoverId && !mobile && !displayDetail ? <Tooltip2 {...propsTooltip2} /> : ''}
    <RightPanel active={rightActive} />
  </div>;
}

Ui.propTypes = {
  leftActive: PropTypes.bool,
  rightActive: PropTypes.bool,
  displayDetail: PropTypes.any,
  hoverId: PropTypes.any,
  detail: PropTypes.any,
  place: PropTypes.object,
  onePlace: PropTypes.any,
  allId: PropTypes.array,
  mobile: PropTypes.bool,
  viewportWidth: PropTypes.number,
  viewportHeight: PropTypes.number
};

export default Ui;
