
import { Component, PropTypes } from 'react';
import r from 'r-dom';
import { SVGOverlay } from 'react-map-gl';
import assign from 'object-assign';


class OverlayMarker extends Component {
  constructor(props) {
    super(props);
    // this._onClick = this._onClick.bind(this);
  }
  render() {
    const { locations } = this.props;
    return r(SVGOverlay, assign({}, this.props, {
      redraw: function redraw(opt) {
        return r.g(locations.map((e, i) => {
          var pixel = opt.project([e.longitude, e.latitude]);
          return r.g({key: i}, [
            r.circle({
              cx: pixel[0],
              cy: pixel[1],
              r: 10,
              fill: 'red',
              style: { opacity: 0.5 }
            }),
            r.circle({
              cx: pixel[0],
              cy: pixel[1],
              r: 16,
              fill: 'red',
              style: { opacity: 0.3 }
            }),
            r.image({
              xlinkHref: 'img/marker.svg',
              x: pixel[0] - 8,
              y: pixel[1] - 8,
              style: {
                pointerEvents: 'all',
                cursor: 'pointer'
              },
              onClick: () => console.log('tralala')
            })
          ]);
        }));
      }
    }));
  }
}

export default OverlayMarker;

OverlayMarker.propTypes = {
  locations: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired
};
