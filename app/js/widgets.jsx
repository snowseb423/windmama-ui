import React, { Component } from 'react';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';
import LastDetailWidget from './lastDetailWidget.jsx';

class Widgets extends Component {
  constructor(props) {
    super(props);
    this.updateStateCover = this.updateStateCover.bind(this);
    this.state = {
      active: false
    };
  }
  componentDidMount() {
    store.on(typeOfActions.REQUEST_DETAIL, this.updateStateCover);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.REQUEST_DETAIL, this.updateStateCover);
  }
  updateStateCover() {
    if(store.detailActive)
      this.setState({ active: store.detailActive });
    else
      this.setState({ active: false });
  }
  render() {
    var classNameIfActive;
    if(store.detailActive)
      classNameIfActive = 'active';
    else
      classNameIfActive = ' ';
    return <div id="cover-widgets" className={classNameIfActive}>
      <div className="container-widgets" id="container-widgets">
        <InfoWidget id={this.state.active} />
        <LastDetailWidget />
        <Last2HoursWidget />
        <Last24HoursWidget />
      </div>
    </div>;
  }
}

export default Widgets;
