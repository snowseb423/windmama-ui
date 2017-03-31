import assign from 'object-assign';
import MapGL from 'react-map-gl';
import React, { Component, PropTypes } from 'react';
import OverlayMarker from './overlayMarker.jsx';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';
import debounce from 'debounce';

class ContainerMap extends Component {
  constructor(props) {
    super(props);
    this._onChangeViewport = this._onChangeViewport.bind(this);
    this._loadSensor = this._loadSensor.bind(this);
    this._displayDetail = this._displayDetail.bind(this);
    this._resize = this._resize.bind(this);
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
        startDragLngLat: true,
        isDragging: true
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
  }
  _resize() {
    const { viewportWidth, viewportHeight } = this.props.data;
    const viewport = assign({}, this.state.viewport, {width: viewportWidth, height: viewportHeight});
    this.setState({viewport});
    this.forceUpdate();
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
    const { mobile } = this.props.data;
    return <MapGL style={{transitionDuration: '300ms', filter: displayDetail ? 'blur(10px)' : 'blur(0px)'}} onResize={this._resize} onChangeViewport={this._onChangeViewport} {...viewport} {...mapboxDepend}>
      <OverlayMarker mobile={mobile}{...viewport} {...options} locations={locations} />
    </MapGL>;
  }
}

ContainerMap.propTypes = {
  data: PropTypes.object
};

export default ContainerMap;