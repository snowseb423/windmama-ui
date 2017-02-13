import React, { Component, PropTypes } from 'react';
import MapContainer from './mapContainer.jsx';
import Ui from './ui.jsx';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';


class Layout extends Component {
  constructor(props) {
    super(props);
    this.displayDetail = this.displayDetail.bind(this);
    this.updateLeftPanel = this.updateLeftPanel.bind(this);
    this.updateRightPanel = this.updateRightPanel.bind(this);
    this.state = {
      leftActive: false,
      rightActive: false,
      onePlace: false
    };
  }
  componentDidMount() {
    store.on(typeOfActions.SEND_DATA, this.displayDetail);
    store.on(typeOfActions.DISPLAY_DETAIL, this.displayDetail);
    store.on(typeOfActions.UPDATE_DETAIL, this.displayDetail);
    store.on(typeOfActions.LEFT_ACTIVATION, this.updateLeftPanel);
    store.on(typeOfActions.RIGHT_ACTIVATION, this.updateRightPanel);
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
  render() {
    const { leftActive, rightActive, onePlace } = this.state;
    const { displayDetail, detail, place, allId, mobile } = this.props.data;
    const propsUi = { displayDetail, detail, onePlace, place, allId, mobile, rightActive, leftActive };
    const propsMap = { place, allId, location, detail, displayDetail };
    return <div style={{height:'100%'}}>
      <MapContainer {...propsMap} />
      <Ui {...propsUi} />
    </div>;
  }
}

Layout.propTypes = {
  data: PropTypes.any,
  displayDetail: PropTypes.any,
  detail: PropTypes.any,
  place: PropTypes.object,
  allId: PropTypes.array,
  mobile: PropTypes.bool
};

export default Layout;
