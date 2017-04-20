import assign from 'object-assign';
import MapGL from 'react-map-gl';
import React, { Component, PropTypes } from 'react';
import OverlayMarker from './overlayMarker.jsx';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';

class ContainerMap extends Component {
  constructor(props) {
    super(props);
    this._onChangeViewport = this._onChangeViewport.bind(this);
    this._loadSensor = this._loadSensor.bind(this);
    this._displayDetail = this._displayDetail.bind(this);
    this._resize = this._resize.bind(this);
    this._pinchLevel = this._pinchLevel.bind(this);
    const { viewportWidth, viewportHeight } = this.props.data;
    this.state = {
      viewport: {
        latitude: 46.7,
        longitude: 3.5,
        zoom: 5.5,
        width: viewportWidth,
        height: viewportHeight
      },
      options: {
        startDragLngLat: false,
        isDragging: false
      },
      mapboxDepend: {
        mapStyle: 'mapbox://styles/arguelbenoit/cj0urisrp00m02rqpr2zw3tqp',
        mapboxApiAccessToken: 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg'
      },
      locations: [],
      displayDetail: false
    };
  }
  componentDidMount() {
    store.on(typeOfActions.SEND_DATA, this._loadSensor);
    store.on(typeOfActions.UPDATE_DETAIL, this._loadSensor);
    store.on(typeOfActions.DISPLAY_DETAIL, this._displayDetail);
    store.on(typeOfActions.CHANGE_VIEWPORT, this._resize);
    store.on(typeOfActions.PINCH_LEVEL, this._pinchLevel);
  }
  shouldComponentUpdate() {
    return true;
  }
  _resize() {
    const { viewportWidth, viewportHeight } = this.props.data;
    this.setState({
      viewport: assign({}, this.state.viewport, {width: viewportWidth, height: viewportHeight})
    });
  }
  _pinchLevel() {
    var newZoom;
    const { pinchLevel } = this.props.data;
    const { zoom } = this.state.viewport;
    if (pinchLevel < 1)
      newZoom = zoom - (pinchLevel*2);
    else
      newZoom = zoom + (pinchLevel/2);
    this.setState({
      viewport: assign({}, this.state.viewport, {zoom: newZoom})
    });
  }
  _displayDetail() {
    this.setState({displayDetail: this.props.data.displayDetail});
  }
  _onChangeViewport(newViewport) {
    const viewport = assign({}, this.state.viewport, newViewport);
    this.setState({viewport});
  }
  _loadSensor() {
    const { allId, detail, place } = this.props.data;
    var allSpots = [];
    allId.forEach((e) => {
      if (place[e][1] !== 'null') {
        allSpots.push({
          'longitude': place[e][2],
          'latitude': place[e][1],
          'heading': detail[e][0][5],
          'max': detail[e][0][4],
          'id': detail[e][0][0]
        });
      }
    });
    this.setState({locations: allSpots});
  }
  render() {
    const { viewport, mapboxDepend, options, locations, displayDetail } = this.state;
    const { idUpdate, mobile } = this.props.data;
    return <MapGL style={{ filter: displayDetail ? 'blur(10px)' : 'blur(0px)'}} onChangeViewport={this._onChangeViewport} {...viewport} {...mapboxDepend}>
      <OverlayMarker mobile={mobile} {...viewport} {...options} locations={locations} idUpdate={idUpdate}/>
    </MapGL>;
  }
}

ContainerMap.propTypes = {
  data: PropTypes.object
};

export default ContainerMap;
