import React, { Component } from 'react';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';

class Widgets extends Component {
  constructor(props) {
    super(props);
    this.updateStateCover = this.updateStateCover.bind(this);
    this.displayDetail = this.displayDetail.bind(this);
    this.state = {
      idActive: false,
      displayDetail: false,
      detail: false
    };
  }
  componentDidMount() {
    store.on(typeOfActions.REQUEST_DETAIL, this.updateStateCover);
    store.on(typeOfActions.DISPLAY_DETAIL, this.displayDetail);
    store.on(typeOfActions.UPDATE_DETAIL, () => {
      if (this.state.idActive == store.idDetail)
        this.updateStateCover;
    });
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.REQUEST_DETAIL, this.updateStateCover);
    store.removeListener(typeOfActions.DISPLAY_DETAIL, this.displayDetail);
    store.removeListener(typeOfActions.UPDATE_DETAIL, this.updateStateCover);
  }
  updateStateCover() {
    if(store.idDetailActive) {
      this.setState({
        idActive: store.idDetailActive,
        detail: store.detail[store.idDetailActive]
      });
    } else {
      this.setState({
        idActive: false,
        detail: false
      });
    }
  }
  displayDetail() {
    this.setState({
      displayDetail: !this.state.displayDetail
    });
  }
  render() {
    var classIfActive;
    if(this.state.displayDetail)
      classIfActive = 'active';
    else
      classIfActive = '';
    return <div id="cover-widgets" className={classIfActive}>
      <div className="container-widgets" id="container-widgets">
        <InfoWidget idStation={this.state.idActive} />
        <Last2HoursWidget detail={this.state.detail} />
        <Last24HoursWidget detail={this.state.detail} />
      </div>
    </div>;
  }
}

export default Widgets;
