var assign = require('object-assign');
var MapGL = require('react-map-gl');
var React = require('react');

var MapContainer = React.createClass({
  getInitialState() {
    return {
      viewport: {
        latitude: 37.78,
        longitude: -122.45,
        zoom: 11,
        width: 800,
        height: 800,
        startDragLngLat: null,
        isDragging: null
      }
    };
  },

  _onChangeViewport(newViewport) {
    this.setState({viewport: newViewport});
  },

  render() {
    var {mapStyle, viewport} = this.state;
    return <MapGL
      onChangeViewport={this._onChangeViewport}
      {...viewport}
      mapboxApiAccessToken={'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg'}
    />;
  }
});

module.exports = MapContainer;
