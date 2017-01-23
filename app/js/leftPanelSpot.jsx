import React, { PropTypes, Component } from 'react';
import { windColor } from './common.js';
import { Actions } from './store/actions.js';
import TooltipLeft from './tooltipLeft.jsx';

class LeftPanelSpot extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }
  handleMouseIn() { this.setState({ hover: true }); }
  handleMouseOut() { this.setState({ hover: false }); }
  sumFunc(id) {
    Actions.displayDetail(id);
    if (this.props.mobile)
      Actions.leftActivation();
  }
  render() {
    const { place, detail, max, search, mobile } = this.props;
    var detailSplited = detail[0].split('|');
    var id = detailSplited[0];
    var heading = -detailSplited[5];
    var placeSplited = place.split('|');
    var city = placeSplited[3];
    if (city.search('"') > -1)
      city = city.split('"')[1];
    if (city.length >= 22)
      city = city.substring(0, 22) + '...';
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
    if (search == false)
      styleContainer.display = 'inherit';
    else if (cityDetail.indexOf(search) >= 0 || cityDetail.toLowerCase().indexOf(search) >= 0 )
      styleContainer.display = 'inherit';
    else if(search === undefined)
      styleContainer.display = 'inherit';
    else
      styleContainer.display = 'none';
    var tooltip = this.state.hover && !mobile ? <TooltipLeft detail={detail[0]}/> : '';
    return <div style={styleContainer} className="child-panel button" onClick={() => this.sumFunc(id)} onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
      {tooltip}
      <span style={{ marginLeft: '7px'}}>{city}</span>
      <div style={{float: 'right', marginRight: '7px'}}>
        <img style={styleImgAverage} src="img/windheading.png" width="20px" height="20px" />
        <span style={styleSpanAverage}>{Math.round(max / 1.852) + ' nds'}</span>
      </div>
    </div>;
  }
}

LeftPanelSpot.propTypes = {
  max: PropTypes.number,
  detail: PropTypes.any,
  place: PropTypes.any,
  search: PropTypes.string,
  mobile: PropTypes.bool
};

export default LeftPanelSpot;
