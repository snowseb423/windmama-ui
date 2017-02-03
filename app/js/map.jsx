import mapboxgl from 'mapbox-gl';
import { Actions } from './store/actions.js';

var map = () => {
  var mymap = new mapboxgl.Map({
    style: 'mapbox://styles/arguelbenoit/cixuf036e00632rqn6tcxdbuu',
    container: 'map',
    center: [3.5, 46.7],
    zoom: 4.80
  });
  mymap.dragRotate.disable();
  mymap.touchZoomRotate.disableRotation();
  // 'icon-rotate': Number(detailSplited[5]),

  mymap.once('load', () => {
    this.props.allId.forEach((element) => {
      // var detailSplited = this.props.detail[element][0].split('|');
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
          marker.addTo(mymap);
    });
  });
};

export default map;
