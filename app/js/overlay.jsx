
import { Component, PropTypes } from 'react';
import r from 'r-dom';
import { SVGOverlay } from 'react-map-gl';
import assign from 'object-assign';


class Overlay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { locations } = this.props;
    return r(SVGOverlay, assign({}, this.props, {
      redraw: function redraw(opt) {
        return r.g(locations.map( e => {
          var pixel = opt.project([e.longitude, e.latitude]);
          return r.circle({
            cx: pixel[0],
            cy: pixel[1],
            r: 10,
            style: {
              fill: 'rgba(231, 76, 60, 0.4)',
              pointerEvents: 'all',
              cursor: 'pointer'
            }
          });
        }));
      }
    }));
  }
}

export default Overlay;

Overlay.propTypes = {
  locations: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired
};
