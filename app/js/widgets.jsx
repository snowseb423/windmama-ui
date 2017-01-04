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
    this.state = {
      active: false,
      detail: false
    };
  }
  componentDidMount() {
    store.on(typeOfActions.REQUEST_DETAIL, this.updateStateCover);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.REQUEST_DETAIL, this.updateStateCover);
  }
  updateStateCover() {
    if(store.detailActive) {
      this.setState({
        active: store.detailActive,
        detail: store.detail[store.detailActive]
      });
    } else {
      this.setState({
        active: false,
        detail: false
      });
    }
  }
  render() {
    var classNameIfActive;
    var detailPlace;
    if(store.detailActive) {
      classNameIfActive = 'active';
      var placeSplited = (store.place[this.state.active]).split('|');
      detailPlace = 'PiouPiou n° ' + placeSplited[0] + ', ' + placeSplited[1] + '_' + placeSplited[2] + ', ' + placeSplited[4];
    } else {
      classNameIfActive = ' ';
    }
    return <div id="cover-widgets" className={classNameIfActive}>
      <div className="container-widgets" id="container-widgets">
        <InfoWidget idStation={this.state.active} />
        <Last2HoursWidget detail={this.state.detail} />
        <Last24HoursWidget detail={this.state.detail} />
        <div className="widget">
          <div style={{ fontSize: '15px', color: 'black', textAlign: 'center' }}>
            {this.state.active ? detailPlace : ' '}
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Widgets;
