import MapGL, { HTMLOverlay } from 'react-map-gl';
import React, { Component, PropTypes } from 'react';


class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: this.props.mapPosition[1],
        longitude: this.props.mapPosition[0],
        zoom: 5,
        width: '100%',
        height: '100%',
        startDragLngLat: null,
        isDragging: null
      }
    };
    this._onChangeViewport = this._onChangeViewport.bind(this);
  }
  _onChangeViewport(newViewport) {
    var viewport = Object.assign({}, this.state.viewport, newViewport);
    this.setState({viewport});
  }
  render() {
    var loc = [-122.39851786165565, 37.78736425435588];
    var { viewport } = this.state;
    return <MapGL onChangeViewport={this._onChangeViewport} {...viewport} mapboxApiAccessToken={'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg'} >
      <HTMLOverlay width={viewport.width} height={viewport.height}/>
    </ MapGL>;
  }
}

MapContainer.propTypes = {
  viewport: PropTypes.any,
  mapPosition: PropTypes.array
};

export default MapContainer;
