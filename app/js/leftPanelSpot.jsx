import React, { Component } from 'react';
import { getColor, knots } from './common.js';
import { Actions } from './store/actions.js';
import PropTypes from 'prop-types';

class LeftPanelSpot extends Component {
  constructor(props) {
    super(props);
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
    const { place, detail, max, search, viewportWidth} = this.props;
    const id = detail[0][0];
    const heading = detail[0][5];
    const cityDetail = place[4];
    var city = place[3];
    if (city && city.search('"') > -1)
      city = city.split('"')[1];
    if (city && city.length >= 19 && viewportWidth >= 480)
      city = city.substring(0, 18) + '...';
    const styleSpanAverage = {
      color: getColor(max),
      float: 'right',
      marginRight: '8px'
    };
    const styleImgAverage = {
      transform: 'rotateZ(' + heading + 'deg)',
      float: 'right'
    };
    var styleContainer = {
      fontSize: '14px',
      color: '#ccc',
      width: '100%',
      display: 'inherit'
    };
    if (search === false)
      styleContainer.display = 'inherit';
    else if (cityDetail.indexOf(search) >= 0 || cityDetail.toLowerCase().indexOf(search) >= 0 )
      styleContainer.display = 'inherit';
    else if(search === undefined)
      styleContainer.display = 'inherit';
    else
      styleContainer.display = 'none';
    return <div style={styleContainer} className="child-panel button" onClick={() => this.sumFunc(id)} onMouseOver={() => Actions.hoverId(this.props.id)} >
      <span style={{ marginLeft: '7px'}}>{city}</span>
      <div style={{float: 'right', marginRight: '7px'}}>
        <img style={styleImgAverage} alt="" src="img/windheading.png" width="20px" height="20px" />
        <span style={styleSpanAverage}>{knots(max) + ' nds'}</span>
      </div>
    </div>;
  }
}

LeftPanelSpot.propTypes = {
  mobile: PropTypes.bool,
  id: PropTypes.string,
  max: PropTypes.number,
  viewportWidth: PropTypes.number,
  detail: PropTypes.array,
  place: PropTypes.array,
  search: PropTypes.any,
  displayDetail: PropTypes.any
};

export default LeftPanelSpot;
