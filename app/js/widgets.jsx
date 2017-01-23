import React, { Component } from 'react';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';

class Widgets extends Component {
  constructor(props) {
    super(props);
    this.displayDetail = this.displayDetail.bind(this);
    this.state = {
      displayDetail: false,
      detail: false,
      infoPlace: ''
    };
  }
  componentDidMount() {
    store.on(typeOfActions.DISPLAY_DETAIL, this.displayDetail);
    store.on(typeOfActions.UPDATE_DETAIL, () => {
      if (this.state.displayDetail == store.displayDetail)
        this.displayDetail;
    });
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.DISPLAY_DETAIL, this.displayDetail);
    store.removeListener(typeOfActions.UPDATE_DETAIL, this.displayDetail);
  }
  displayDetail() {
    if(store.displayDetail) {
      this.setState({
        displayDetail: store.displayDetail,
        detail: store.detail[store.displayDetail]
      });
    } else {
      this.setState({
        displayDetail: false,
        detail: false
      });
    }
  }
  render() {
    var content = <div>
      <InfoWidget place={store.place[this.state.displayDetail]} />
      <Last2HoursWidget detail={this.state.detail} />
      <Last24HoursWidget detail={this.state.detail} />
    </div>;
    return <div id="cover-widgets" className={this.state.displayDetail ? 'active' : ''}>
      <div className="container-widgets" id="container-widgets">
        {this.state.displayDetail ? content : ''}
      </div>
    </div>;
  }
}

export default Widgets;
