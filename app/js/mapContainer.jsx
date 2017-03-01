import React, { PropTypes, Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Actions } from './store/actions.js';
import { windColor } from './common.js';
import Tooltip from './tooltip.jsx';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.shiftingMap = this.shiftingMap.bind(this);
  }
  componentDidMount() {
    store.on(typeOfActions.SHIFTING_MAP, this.shiftingMap);
    this.mymap = new mapboxgl.Map({
      style: 'mapbox://styles/arguelbenoit/cixuf036e00632rqn6tcxdbuu',
      container: 'map',
      center: this.props.mapPosition,
      zoom: 5
    });
    this.mymap.dragRotate.disable();
    this.mymap.touchZoomRotate.disableRotation();
    this.mymap.once('load', () => {
      this.props.allId.forEach((element) => {
        if (typeof this.props.detail[element] !== 'undefined') {
          var detailSplited = this.props.detail[element][0].split('|');
          var placeSplited = this.props.place[element].split('|');

          var htmlMarker = document.createElement('div');
          htmlMarker.className = 'marker marker_' + element;

          htmlMarker.innerHTML =  '<div class="child-marker child-marker-1" style="background: ' + windColor[Math.round((detailSplited[4]/1.852))] + ';"></div>' +
          '<div class="child-marker child-marker-2" style="background: ' + windColor[Math.round((detailSplited[4]/1.852))] + ';"></div>' +
          '<img src="img/windheading2.png" width="100%" height="100%" class="child-marker child-marker-3" style="transform: scale(0.5) rotateZ(' + Number(detailSplited[5]) + 'deg);"></div>';

          htmlMarker.addEventListener('click', () => {
            Actions.displayDetail(element);
            if (this.props.mobile)
              Actions.leftActive(false)
          });
          htmlMarker.addEventListener('mouseover', () => {
            this.handleMouseIn(element);
          });
          htmlMarker.addEventListener('mouseout', () => {
            this.handleMouseOut();
          });

          var marker = new mapboxgl.Marker(htmlMarker);
          marker.setLngLat([placeSplited[2], placeSplited[1]]);
          marker.addTo(this.mymap);
        }
      });
    });
  }
  shiftingMap() {
    this.mymap.flyTo({center: store.mapPosition, zoom: 9});
  }
  handleMouseIn(element) {
    this.setState({ hover: element });
    Actions.hoverId(element);
  }
  handleMouseOut() {
    this.setState({hover: false });
  }
  render() {
    const { hover } = this.state;
    const { detail, mobile, displayDetail } = this.props;
    return <div className={displayDetail ? 'blur' : ''} id="map-container">
      {hover && !mobile ? <Tooltip id={hover} position={'map'} detail={detail[hover][0]}/> : ''}
      <div style={{ height: '100%' }} id="map" />
    </div>;
  }
}

MapContainer.propTypes = {
  displayDetail: PropTypes.any,
  hoverId: PropTypes.any,
  detail: PropTypes.any,
  place: PropTypes.object,
  allId: PropTypes.array,
  mapPosition: PropTypes.array,
  mobile: PropTypes.bool
};

export default MapContainer;
