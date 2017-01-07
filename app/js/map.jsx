import React, { Component } from 'react';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg';


class Map extends Component {
  constructor(props) {
    super(props);
    this.updateStateCover = this.updateStateCover.bind(this);
    this.state = { detailActive: false };
  }
  componentDidMount() {
    store.on(typeOfActions.REQUEST_DETAIL, this.updateStateCover);
    this.mapgl = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/arguelbenoit/cis3ubuek000qhknj40idc0rs',
      center: [2.5, 46.7],
      zoom: 5.80
    });
    this.mapgl.once('load', () => {
      store.allId.forEach((element) => {
        var detailSplited = store.detail[element][0].split('|'); // detailSplited[5] = heading
        var placeSplited = store.place[element].split('|');
        this.mapgl.addSource('heading' + element, {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'Point',
                  'coordinates': [placeSplited[2], placeSplited[1]]
                }
              }
            ]
          }
        });
        this.mapgl.addLayer({
          'id': 'heading' + element,
          'type': 'symbol',
          'source': 'heading' + element,
          'layout': {
            'icon-image': 'heading',
            'icon-size': 0.06
          },
          'paint': {}
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
