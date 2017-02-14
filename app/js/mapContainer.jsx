import React, { PropTypes, Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Actions } from './store/actions.js';
import { windColor } from './common.js';
import Tooltip from './tooltip.jsx';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
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

        var detailSplited = this.props.detail[element][0].split('|');
        var placeSplited = this.props.place[element].split('|');

        var htmlMarker = document.createElement('div');
        htmlMarker.className = 'marker marker_' + element;

        htmlMarker.innerHTML =  '<div class="child-marker child-marker-1" style="background: ' + windColor[Math.round((detailSplited[4]/1.852))] + ';"></div>' +
                                '<div class="child-marker child-marker-2" style="background: ' + windColor[Math.round((detailSplited[4]/1.852))] + ';"></div>' +
                                '<img src="img/windheading2.png" width="100%" height="100%" class="child-marker child-marker-3" style="transform: scale(0.5) rotateZ(' + Number(detailSplited[5]) + 'deg);"></div>';

        htmlMarker.addEventListener('click', () => {
          Actions.displayDetail(element);
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
      });
    });
  }
  handleMouseIn(element) {
    this.setState({ hover: element });
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
  mobile: PropTypes.bool
};

export default MapContainer;
