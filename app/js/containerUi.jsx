import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LeftPanel from './leftPanel.jsx';
import RightPanel from './rightPanel.jsx';
import ContainerWidget from './containerWidget.jsx';
import Header from './header.jsx';
import Tooltip from './tooltip.jsx';
import UpdateWall from './updateWall.jsx';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';

class ContainerUi extends Component {
  constructor(props) {
    super(props);
    this.displayDetail = this.displayDetail.bind(this);
    this.updateLeftPanel = this.updateLeftPanel.bind(this);
    this.updateRightPanel = this.updateRightPanel.bind(this);
    this.newViewportSize = this.newViewportSize.bind(this);
    this.newHoverId = this.newHoverId.bind(this);
    this.state = {
      leftActive: false,
      rightActive: false,
      onePlace: false,
      hoverId: false
    };
  }
  componentDidMount() {
    store.on(typeOfActions.CHANGE_VIEWPORT, this.newViewportSize);
    store.on(typeOfActions.SEND_DATA, this.displayDetail);
    store.on(typeOfActions.DISPLAY_DETAIL, this.displayDetail);
    store.on(typeOfActions.UPDATE_DETAIL, this.displayDetail);
    store.on(typeOfActions.LEFT_ACTIVATION, this.updateLeftPanel);
    store.on(typeOfActions.RIGHT_ACTIVATION, this.updateRightPanel);
    store.on(typeOfActions.HOVER_ID, this.newHoverId);
  }
  newHoverId() {
    this.setState({ hoverId: this.props.data.hoverId });
  }
  updateLeftPanel() {
    this.setState({
      leftActive: !this.state.leftActive,
      rightActive: false
    });
  }
  updateRightPanel() {
    this.setState({
      rightActive: !this.state.rightActive,
      leftActive: false
    });
  }
  displayDetail() {
    const { displayDetail, place } = this.props.data;
    if(displayDetail)
      this.setState({ onePlace : place[displayDetail] });
    else
      this.setState({ onePlace: false });
  }
  newViewportSize() {
    this.forceUpdate();
  }
  render() {
    const { leftActive, rightActive, onePlace, hoverId} = this.state;
    const { displayDetail, detail, place, allId, mobile, viewportWidth, viewportHeight, idUpdate } = this.props.data;
    const propsWidget = { displayDetail, oneDetail: detail[displayDetail], onePlace, leftActive, rightActive, mobile, viewportWidth, viewportHeight };
    const propsLeftPanel = { displayDetail, detail, place, allId, leftActive, mobile, viewportWidth, viewportHeight };
    const propsTooltip = { hoverId, leftActive, detail, place };
    const propsWall = { rightActive, detail, place, idUpdate, displayDetail };
    return <div id="ui" className="elements-ui-absolute">
      <Header leftActive={leftActive} rightActive={rightActive}/>
      <LeftPanel {...propsLeftPanel} />
      {displayDetail ? <ContainerWidget {...propsWidget} /> : ''}
      {hoverId && !mobile && !displayDetail ? <Tooltip {...propsTooltip} /> : ''}
      {!mobile ? <UpdateWall {...propsWall} /> : ''}
      <RightPanel rightActive={rightActive} />
    </div>;
  }
}

ContainerUi.propTypes = {
  data: PropTypes.object
};

export default ContainerUi;
