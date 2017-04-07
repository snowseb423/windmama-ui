import { Component, PropTypes } from 'react';
import r from 'r-dom';
import { SVGOverlay } from 'react-map-gl';
import assign from 'object-assign';
import { Actions } from './store/actions.js';
import { windColor } from './common.js';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';


class OverlayMarker extends Component {
  constructor(props) {
    super(props);
    this._animation = this._animation.bind(this);
    this.state = { lastUpdate: 0 };
  }
  componentDidMount() {
    store.on(typeOfActions.UPDATE_DETAIL, this._animation);
  }
  _animation() {
    if (this.props.idUpdate !== this.state.lastUpdate) {
      this.setState({lastUpdate: this.props.idUpdate});
    }
  }
  render() {
    const { locations } = this.props;
    const { lastUpdate } = this.state;
    return r(SVGOverlay, assign({}, this.props, {
      redraw: function redraw(opt) {
        return r.g(locations.map((e, i) => {
          var pixel = opt.project([e.longitude, e.latitude]);
          var color;
          if (e.max/1.852 <= 50)
            color = windColor[Math.round((e.max/1.852))];
          else
            color = windColor[49];
          if (e.id === lastUpdate) {
            return r.g({
              key: i,
              onClick: () => Actions.displayDetail(e.id),
              onMouseOver: () => Actions.hoverId(e.id),
              style: {
                pointerEvents: 'all',
                cursor: 'pointer',
                transform: 'translateX(' + pixel[0] + 'px) translateY(' + pixel[1] + 'px) scale(0.9)'
              }
            }, [
              r.circle({
                className: 'animation-circle',
                cx: 0,
                cy: 0,
                r: 16,
                fill: 'transparent',
                stroke: color
              }),
              r.circle({
                cx: 0,
                cy: 0,
                r: 12,
                fill: '#000',
                stroke: color,
                strokeWidth: 1.5
              }),
              r.polyline({
                points: '-5,-6 0,-3 5,-6 0,7 -5,-6',
                fill: color,
                style: {
                  transform: 'rotateZ(' + e.heading + 'deg) '
                }
              })
            ]);
          } else {
            return r.g({
              key: i,
              onClick: () => Actions.displayDetail(e.id),
              onMouseOver: () => Actions.hoverId(e.id),
              style: {
                pointerEvents: 'all',
                cursor: 'pointer',
                transform: 'translateX(' + pixel[0] + 'px) translateY(' + pixel[1] + 'px) scale(0.9)'
              }
            }, [
              r.circle({
                cx: 0,
                cy: 0,
                r: 16,
                fill: 'transparent',
                stroke: color,
                strokeWidth: 8,
                style: { opacity: 0.15 }
              }),
              r.circle({
                cx: 0,
                cy: 0,
                r: 12,
                fill: '#000',
                stroke: color,
                strokeWidth: 1.5
              }),
              r.polyline({
                points: '-5,-6 0,-3 5,-6 0,7 -5,-6',
                fill: color,
                style: {
                  transform: 'rotateZ(' + e.heading + 'deg) '
                }
              })
            ]);
          }
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
  isDragging: PropTypes.bool.isRequired,
  idUpdate: PropTypes.any
};
