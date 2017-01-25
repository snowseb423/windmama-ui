import React, { PropTypes, Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { windColor } from './common.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg';
var styleMap = [
  'mapbox://styles/arguelbenoit/cixuf036e00632rqn6tcxdbuu',  // outDoor
  'mapbox://styles/arguelbenoit/cixn5ff94000p2smvtmzbq19h', // light
  'mapbox://styles/arguelbenoit/cixneiyd600152rqs0zofik9f', // dark
  'mapbox://styles/arguelbenoit/cixnofz09001k2rqsrvjb7iqg'  // satellite
];
class Map extends Component {
  constructor(props) { super(props); }
  componentDidMount() {
    this.mapgl = new mapboxgl.Map({
      style: styleMap[0],
      container: 'map',
      center: [3.5, 46.7],
      zoom: 4.80
    });
    this.mapgl.dragRotate.disable();
    this.mapgl.touchZoomRotate.disableRotation();
    this.mapgl.once('load', () => {
      this.props.allId.forEach((element) => {
        var detailSplited = this.props.detail[element][0].split('|');
        var placeSplited = this.props.place[element].split('|');
        this.mapgl.addLayer(
          'id': element,
          'type': 'circle',
          'source': {
            'type': 'geojson',
            'data': {
              'type': "FeatureCollection",
              'features': [{
                'type': 'Feature',
                'properties': {
                  'icon': 'theatre'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-77.038659, 38.931567]
                }
              }
            },
           "layout": {
               "icon-image": "{icon}-15",
               "icon-allow-overlap": true
           }
        );
        // this.mapgl.addLayer('sensor-' + element, {
        //   'type': 'geojson',
        //   'data': {
        //     'type': 'FeatureCollection',
        //     'features': [{
        //       'type': 'Feature',
        //       'geometry': {
        //         'type': 'Point',
        //         'coordinates': [placeSplited[2], placeSplited[1]]
        //       }
        //     }]
        //   }
        // });
        // this.mapgl.addLayer({
        //   'id': 'circle2-' + element,
        //   'type': 'circle',
        //   'source': 'sensor-' + element,
        //   'paint': {
        //     'circle-radius': 18,
        //     'circle-color': windColor[Math.round((detailSplited[4]/1.852))],
        //     'circle-opacity': 0.2
        //   }
        // });
        // this.mapgl.addLayer({
        //   'id': 'circle3-' + element,
        //   'type': 'circle',
        //   'source': 'sensor-' + element,
        //   'paint': {
        //     'circle-radius': 10,
        //     'circle-color': windColor[Math.round((detailSplited[4]/1.852))],
        //     'circle-opacity': 1
        //   }
        // });
        // this.mapgl.addLayer({
        //   'id': 'sensor-' + element,
        //   'type': 'symbol',
        //   'source': 'sensor-' + element,
        //   'layout': {
        //     'icon-image': 'arrow',
        //     'icon-rotate': Number(detailSplited[5]),
        //     'icon-size': 0.02
        //   }
        // });
      });
    });
  }
  render() {
    const { displayDetail } = this.props;
    return <div className={displayDetail ? 'blur' : ''} style={{ height: '100%' }} id="map" />;
  }
}

Map.propTypes = {
  displayDetail: PropTypes.any,
  detail: PropTypes.any,
  place: PropTypes.object,
  allId: PropTypes.array
};

export default Map;
