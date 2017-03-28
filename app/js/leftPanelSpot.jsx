import React, { PropTypes, Component } from 'react';
import { windColor } from './common.js';
import { Actions } from './store/actions.js';

class LeftPanelSpot extends Component {
  constructor(props) {
    super(props);
  }
  sumFunc(id) {
    const { place } = this.props;
    if (!this.props.displayDetail && !this.props.mobile) {
      Actions.shiftingMap([place.split('|')[2], place.split('|')[1]]);
      setTimeout(() => { Actions.displayDetail(id); }, 1000);
    } else if (!this.props.displayDetail && this.props.mobile) {
      Actions.leftActivation();
      setTimeout(() => { Actions.shiftingMap([place.split('|')[2], place.split('|')[1]]); }, 500);
      setTimeout(() => { Actions.displayDetail(id); }, 1500);
    } else if (this.props.displayDetail && this.props.mobile) {
      Actions.leftActivation();
      Actions.displayDetail(id);
    } else {
      Actions.displayDetail(id);
    }
  }
  render() {
    const { place, detail, max, search } = this.props;
    var detailSplited = detail[0].split('|'),
        id = detailSplited[0],
        heading = detailSplited[5];
    var placeSplited = place.split('|');
    var city = placeSplited[3];
    if (city.search('"') > -1)
      city = city.split('"')[1];
    if (city.length >= 19)
      city = city.substring(0, 19) + '..';
    var color;
    if (max/1.852 <= 50)
      color = windColor[Math.round((max/1.852))];
    else
      color = windColor[49];
    const styleSpanAverage = {
      color: color,
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
    var cityDetail = placeSplited[4];
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
        <span style={styleSpanAverage}>{Math.round(max / 1.852) + ' nds'}</span>
      </div>
    </div>;
  }
}

LeftPanelSpot.propTypes = {
  mobile: PropTypes.bool,
  id: PropTypes.string,
  max: PropTypes.number,
  detail: PropTypes.array,
  place: PropTypes.string,
  search: PropTypes.any,
  displayDetail: PropTypes.any
};

export default LeftPanelSpot;
