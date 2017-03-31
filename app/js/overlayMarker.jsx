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
    const { locations, mobile } = this.props;
    return r(SVGOverlay, assign({}, this.props, {
      redraw: function redraw(opt) {
        return r.g(locations.map((e, i) => {
          var pixel = opt.project([e.longitude, e.latitude]);
          var color;
          if (e.max/1.852 <= 50)
            color = windColor[Math.round((e.max/1.852))];
          else
            color = windColor[49];
          return r.g({
            key: i,
            onClick: () => Actions.displayDetail(e.id),
            onMouseOver: () => Actions.hoverId(e.id),
            style: {
              pointerEvents: 'all',
              cursor: 'pointer',
              transform: mobile ?
                         'translateX(' + pixel[0] + 'px) translateY(' + pixel[1] + 'px) scale(0.95)' :
                         'translateX(' + pixel[0] + 'px) translateY(' + pixel[1] + 'px) scale(0.90)'
            }
          }, [
            r.circle({
              cx: 0,
              cy: 0,
              r: 20,
              fill: color,
              style: { opacity: 0.15 }
            }),
            r.circle({
              cx: 0,
              cy: 0,
              r: 11,
              fill: '#000',
              stroke: color,
              strokeWidth: 2,
              style: { opacity: 0.8 }
            }),
            r.polyline({
              points: '-5,-6 0,-3 5,-6 0,7 -5,-6',
              fill: color,
              style: {
                transform: 'rotateZ(' + e.heading + 'deg) '
              }
            })
          ]);
        }));
      }
    }));
  }
}

export default OverlayMarker;

OverlayMarker.propTypes = {
  mobile: PropTypes.boolean,
  locations: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired
};
