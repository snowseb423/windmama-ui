import React, { Component } from 'react';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';

class Map extends Component {
  constructor(props) {
    super(props);
    this.updateStateCover = this.updateStateCover.bind(this);
    this.state = { detailActive: false };
  }
  componentDidMount() {
    store.on(typeOfActions.REQUEST_DETAIL, this.updateStateCover);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.REQUEST_DETAIL, this.updateStateCover);
  }
  updateStateCover() {
    if(store.detailActive)
      this.setState({ detailActive: store.detailActive });
    else
      this.setState({ detailActive: false });
  }
  render() {
    const mapStyle = {
      height: '100%'
    };
    var activeOrNot;
    if (store.detailActive)
      activeOrNot = 'blur';
    else
      activeOrNot = ' ';
    return <div className={activeOrNot} style={mapStyle} id="map"/>;
  }
}

export default Map;
