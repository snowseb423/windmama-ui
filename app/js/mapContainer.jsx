import React, { PropTypes, Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Actions } from './store/actions.js';
// import { windColor } from './common.js';
// 'icon-rotate': Number(detailSplited[5]),
// var detailSplited = this.props.detail[element][0].split('|');


mapboxgl.accessToken = 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg';

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.mymap = new mapboxgl.Map({
      style: 'mapbox://styles/arguelbenoit/cixuf036e00632rqn6tcxdbuu',
      container: 'map',
      center: [3.5, 46.7],
      zoom: 4.80
    });
    this.mymap.dragRotate.disable();
    this.mymap.touchZoomRotate.disableRotation();
    this.mymap.once('load', () => {
      this.props.allId.forEach((element) => {
        var placeSplited = this.props.place[element].split('|');

        var htmlMarker = document.createElement('div');
        htmlMarker.className = 'marker marker_' + element;

        // htmlMarker.innerHtml = <div className={'marker marker_' + element}>
        //   <div />
        //   <div />
        // </div>;

        htmlMarker.addEventListener('click', ()=> {
          Actions.displayDetail(element);
        });

        var marker = new mapboxgl.Marker(htmlMarker);
        marker.setLngLat([placeSplited[2], placeSplited[1]]);
        marker.addTo(this.mymap);
      });
    });
  }
  loadMarkers() {
  }
  render() {
    return <div className={this.props.displayDetail ? 'blur' : ''} style={{ height: '100%' }} id="map" />;
  }
}

MapContainer.propTypes = {
  displayDetail: PropTypes.any,
  detail: PropTypes.any,
  place: PropTypes.object,
  allId: PropTypes.array
};

export default MapContainer;
