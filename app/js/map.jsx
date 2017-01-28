import React, {Component, PropTypes} from 'react';
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';

// latitude: 46.7,
// longitude: 3.5,
// zoom: 4.80,

class Map extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ReactMapboxGl style="mapbox://styles/arguelbenoit/cixuf036e00632rqn6tcxdbuu" accessToken="pk.eyJ1IjoiYXJndWVsYmVub2l0IiwiYSI6ImNpczN0aTRpbjAwMWQyb3FkM3d4d3dweWwifQ.TuZpfqS-HyuaUzbe1fIiTg" containerStyle={{ height: '100vh', width: '100vw' }}>
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </ReactMapboxGl>;
  }
}

Map.propTypes = {
  displayDetail: PropTypes.any
};

export default Map;
