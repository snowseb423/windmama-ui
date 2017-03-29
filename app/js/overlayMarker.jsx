import { Component, PropTypes } from 'react';
import r from 'r-dom';
import { SVGOverlay } from 'react-map-gl';
import assign from 'object-assign';
import { Actions } from './store/actions.js';
import { windColor } from './common.js';


class OverlayMarker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { locations } = this.props;
    return r(SVGOverlay, assign({}, this.props, {
      redraw: function redraw(opt) {
        return r.g(locations.map((e, i) => {
          var pixel = opt.project([e.longitude, e.latitude]);
          var color;
          if (e.max/1.852 <= 50)
            color = windColor[Math.round((e.max/1.852))];
          else
            color = windColor[49];
          return r.g({ key: i}, [
            r.circle({
              cx: pixel[0],
              cy: pixel[1],
              r: 20,
              fill: color,
              style: { opacity: 0.1 }
            }),
            r.circle({
              cx: pixel[0],
              cy: pixel[1],
              r: 10,
              fill: '#000',
              stroke: color,
              strokeWidth: 2,
              style: { opacity: 0.5 }
            }),
            r.image({
              xlinkHref: 'img/marker.svg',
              x: pixel[0] - 8,
              y: pixel[1] - 8,
              style: {
                pointerEvents: 'all',
                cursor: 'pointer'
              },
              onClick: () => Actions.displayDetail(e.id),
              onMouseOver: () => Actions.hoverId(e.id)
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
