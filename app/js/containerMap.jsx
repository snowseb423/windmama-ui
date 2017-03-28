import assign from 'object-assign';
import MapGL from 'react-map-gl';
import React, { Component, PropTypes } from 'react';
import OverlayMarker from './overlayMarker.jsx';
// import Immutable from 'immutable';

class ContainerMap extends Component {
  constructor(props) {
    super(props);
    this._onChangeViewport = this._onChangeViewport.bind(this);
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
      mapStyle: 'mapbox://styles/arguelbenoit/cixuf036e00632rqn6tcxdbuu',
      mapboxApiAccessToken: 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg',
      location: {}
    };
  }
  _onChangeViewport(newViewport) {
    const viewport = assign({}, this.state.viewport, newViewport);
    this.setState({viewport});
  }
  render() {
    const { viewport, options, mapStyle, mapboxApiAccessToken } = this.state;
    const locations = [
      {'longitude': -122.39851786165565, 'latitude': 37.78736425435588},
      {'longitude': -122.40015469418074, 'latitude': 37.78531678199267},
      {'longitude': -122.4124101516789, 'latitude': 37.80051001607987}
    ];
    return <MapGL onChangeViewport={this._onChangeViewport} {...viewport} mapStyle={mapStyle} mapboxApiAccessToken={mapboxApiAccessToken}>
      <OverlayMarker {...viewport} {...options} locations={locations} />
    </MapGL>;
  }
}

ContainerMap.propTypes = {
  data: PropTypes.object
};

export default ContainerMap;
