import React, { Component } from 'react';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';
import mapboxgl from 'mapbox-gl';
import { windColor } from './common.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg';
var styleMap = [
    'mapbox://styles/arguelbenoit/cixn5ff94000p2smvtmzbq19h', // light
    'mapbox://styles/arguelbenoit/cixneiyd600152rqs0zofik9f', // dark
    'mapbox://styles/arguelbenoit/cixnofz09001k2rqsrvjb7iqg'  // satellite
];

class Map extends Component {
  constructor(props) {
    super(props);
    this.updateStateCover = this.updateStateCover.bind(this);
    this.state = {
      detailActive: false,
      mapType: 'day'
    };
  }
  componentDidMount() {
    store.on(typeOfActions.REQUEST_DETAIL, this.updateStateCover);

    this.mapgl = new mapboxgl.Map({
      style: styleMap[0],
      container: 'map',
      center: [3.5, 46.7],
      zoom: store.location ? 10 : 4.80
    });
    this.mapgl.dragRotate.disable();
    this.mapgl.touchZoomRotate.disableRotation();

    this.mapgl.once('load', () => {
      store.allId.forEach((element) => {
        var detailSplited = store.detail[element][0].split('|');
        var placeSplited = store.place[element].split('|');
        this.mapgl.addSource('sensor-' + element, {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [placeSplited[2], placeSplited[1]]
              }
            }]
          }
        });
        this.mapgl.addLayer({
          'id': 'circle2-' + element,
          'type': 'circle',
          'source': 'sensor-' + element,
          'paint': {
            'circle-radius': 18,
            'circle-color': windColor[Math.round((detailSplited[4]/1.852))],
            'circle-opacity': 0.2
          }
        });
        this.mapgl.addLayer({
          'id': 'circle3-' + element,
          'type': 'circle',
          'source': 'sensor-' + element,
          'paint': {
            'circle-radius': 10,
            'circle-color': windColor[Math.round((detailSplited[4]/1.852))],
            'circle-opacity': 1
          }
        });
        this.mapgl.addLayer({
          'id': 'sensor-' + element,
          'type': 'symbol',
          'source': 'sensor-' + element,
          'layout': {
            'icon-image': 'arrow',
            'icon-rotate': Number(detailSplited[5]),
            'icon-size': 0.02
          }
        });
      });
    });
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
    var activeOrNot;
    if (store.detailActive)
      activeOrNot = 'blur';
    else
      activeOrNot = ' ';
    return <div className={activeOrNot} style={{ height: '100%' }} id="map" />;
  }
}

export default Map;
