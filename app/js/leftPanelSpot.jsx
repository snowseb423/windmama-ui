import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getColor, knots } from './common.js';
import { Actions } from './store/actions.js';
import moment from 'moment';

class LeftPanelSpot extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    if(nextProps.index !== this.props.index || nextProps.search !== this.props.search) {
      return true;
    } else {
      return false;
    }
  }
  sumFunc(id) {
    if (!this.props.mobile && !this.props.displayDetail) {
      Actions.displayDetail(id);
    } else if (this.props.mobile) {
      Actions.leftActivation();
      Actions.displayDetail(id);
    } else {
      Actions.displayDetail(id);
    }
  }
  render() {
    const { search, viewportWidth, spot} = this.props;
    var city = spot.city.split(',')[1];
    const diff = moment().valueOf() - moment(spot.date).valueOf();
    if (city) {
      if (city.search('"') > -1)
        city = city.split('"')[1];
      if (city.length >= 19 && viewportWidth >= 480)
        city = city.substring(0, 18) + '...';
    }
    const styleSpanAverage = {
      color: diff < 3600000 ? getColor(spot.max) : 'red',
      float: 'right',
      marginRight: '8px'
    };
    const styleImgAverage = {
      transform: 'rotateZ(' + spot.heading + 'deg)',
      float: 'right'
    };
    const styleIconDisconnect = {
      float: 'right',
      color: 'red',
      fontSize: 'large'
    };
    var styleContainer = {
      fontSize: '14px',
      opacity: diff < 3600000 ? 1 : 0.65,
      color: diff < 3600000 ? '#ccc' : 'red',
      width: '100%',
      display: 'inherit'
    };
    if (search === '' || search === false || search === undefined)
      styleContainer.display = 'inherit';
    else if (city.indexOf(search) >= 0 || city.toLowerCase().indexOf(search) >= 0 )
      styleContainer.display = 'inherit';
    else
      styleContainer.display = 'none';
    return <div style={styleContainer} className="child-panel button" onClick={() => this.sumFunc(spot.id)} onMouseOver={() => Actions.hoverId(spot.id)} >
      <span style={{ marginLeft: '7px'}}>{city}</span>
      <div style={{float: 'right', marginRight: '7px'}}>
        {
          diff < 3600000 ?
          <img style={styleImgAverage} alt="" src="img/windheading.png" width="20px" height="20px" /> :
          <i style={styleIconDisconnect} className="fa fa-exclamation-triangle" aria-hidden="true" />
        }
        <span style={styleSpanAverage}>{knots(spot.max) + ' nds'}</span>
      </div>
    </div>;
  }
}

LeftPanelSpot.propTypes = {
  leftActive: PropTypes.bool,
  spot: PropTypes.object,
  index: PropTypes.number,
  mobile: PropTypes.bool,
  viewportWidth: PropTypes.number,
  search: PropTypes.any,
  displayDetail: PropTypes.any
};

export default LeftPanelSpot;
