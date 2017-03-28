import assign from 'object-assign';
import MapGL from 'react-map-gl';
import React, { Component, PropTypes } from 'react';
import OverlayMarker from './overlayMarker.jsx';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';
// import Immutable from 'immutable';

class ContainerMap extends Component {
  constructor(props) {
    super(props);
    this._onChangeViewport = this._onChangeViewport.bind(this);
    this.resize = this.resize.bind(this);
    this.loadSensor = this.loadSensor.bind(this);
    this.displayDetail = this.displayDetail.bind(this);
    const { mapPosition,mapZoom, viewportWidth, viewportHeight } = this.props.data;
    this.state = {
      viewport: {
        latitude: mapPosition[1],
        longitude: mapPosition[0],
        zoom: mapZoom[0],
        width: viewportWidth,
        height: viewportHeight
      },
      options: {
        startDragLngLat: true,
        isDragging: true
      },
      mapboxDepend: {
        mapStyle: 'mapbox://styles/arguelbenoit/cj0trv1lk00jt2rnyoo93gnld',
        mapboxApiAccessToken: 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg',
      },
      locations: [],
      displayDetail: false
    };
  }
  componentDidMount() {
    // store.on(typeOfActions.CHANGE_VIEWPORT, this.resize);
    store.on(typeOfActions.SEND_DATA, this.loadSensor);
    store.on(typeOfActions.UPDATE_DETAIL, this.loadSensor);
    store.on(typeOfActions.DISPLAY_DETAIL, this.displayDetail);
  }
  displayDetail() {
    this.setState({displayDetail: this.props.data.displayDetail});
  }
  resize() {
    const { viewportWidth, viewportHeight } = this.props.data;
    const viewport = assign({}, this.state.viewport, {width: viewportWidth, height: viewportHeight});
    this.setState({viewport});
  }
  _onChangeViewport(newViewport) {
    const viewport = assign({}, this.state.viewport, newViewport);
    this.setState({viewport});
  }
  loadSensor() {
    const { allId, detail, place } = this.props.data;
    var allSpots = [];
    allId.forEach((e) => {
      const placeS = place[e].split('|');
      const detailS = detail[e][0].split('|');
      if (placeS[1] !== 'null')
        allSpots.push(
          {
            'longitude': placeS[2],
            'latitude': placeS[1],
            'heading': detailS[5],
            'max': detailS[4],
            'id': detailS[0]
          }
        );
    });
    this.setState({locations: allSpots});
  }
  render() {
    const { viewport, mapboxDepend, options, locations, displayDetail } = this.state;
    return <MapGL style={{transitionDuration: '300ms', filter: displayDetail ? 'blur(10px)' : 'blur(0px)'}} onChangeViewport={this._onChangeViewport} {...viewport} {...mapboxDepend}>
      <OverlayMarker {...viewport} {...options} locations={locations} />
    </MapGL>;
  }
}

ContainerMap.propTypes = {
  data: PropTypes.object
};

export default ContainerMap;
