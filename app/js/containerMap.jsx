import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';
import { getColor, windColor } from './common.js';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg';

class ContainerMap extends Component {
  constructor(props) {
    super(props);
    this._initMarkers = this._initMarkers.bind(this);
    this.state = { detailActive: false };
  }
  componentDidMount() {
    this.mapgl = new mapboxgl.Map({
      container: 'map',
      center: [2.5, 46.7],
      style: 'mapbox://styles/arguelbenoit/cj0urisrp00m02rqpr2zw3tqp',
      zoom: 4.80
    });
    store.on(typeOfActions.SEND_DATA, this._initMarkers);
  }
  _initMarkers() {
    // console.log('_initMarkers');
    const { data } = this.props;
    this.mapgl.once('load', () => {
      data.allId.forEach((element) => {
        let detail = data.detail[element][0];
        let place = data.place[element];
        this.mapgl.addSource('sensor-' + element, {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [place[2], place[1]]
                }
              }
            ]
          }
        });
        this.mapgl.addLayer({
          'id': 'circle1-' + element,
          'type': 'circle',
          'source': 'sensor-' + element,
          'paint': {
            'circle-radius': 10,
            'circle-color': getColor(detail[4]),
            'circle-opacity': 0.3
          }
        });
        // this.mapgl.addLayer({
        //   'id': 'sensor-' + element,
        //   'type': 'symbol',
        //   'source': 'sensor-' + element,
        //   'layout': {
        //     'icon-image': 'heading',
        //     'icon-rotate': Number(detail[5]),
        //     'icon-size': 0.06
        //   }
        // });
      });
    });
  }
  render() {
    // console.log('render');
    const { viewportWidth, viewportHeight } = this.props.data;
    return <div style={{ height: viewportHeight, width: viewportWidth }} id="map" />;
  }
}

export default ContainerMap;
