import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LeftPanelSpot from './leftPanelSpot.jsx';

class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.changeOnResearch = this.changeOnResearch.bind(this);
    this.clearResearch = this.clearResearch.bind(this);
    this.state = {
      search: '',
      scale: 'scale(0)'
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.leftActive || this.props.leftActive) {
      return true;
    } else {
      return false;
    }
  }
  changeOnResearch(){
    this.setState({search: document.getElementById('research').value});
    if (document.getElementById('research').value === '')
      this.setState({ scale: 'scale(0)' });
    else
      this.setState({ scale: 'scale(1)' });
  }
  clearResearch(){
    document.getElementById('research').value = '';
    this.setState({
      search: '',
      scale: 'scale(0)'
    });
  }
  render() {
    const { detail, place, allId, leftActive , mobile, viewportHeight, viewportWidth, displayDetail } = this.props;
    const { search } = this.state;
    var maxOrder = [];
    allId.forEach((e) => {
      if (typeof detail[e] !== 'undefined')
        maxOrder.push({
          id: detail[e][0][0],
          max: parseInt(detail[e][0][4], 10),
          city: place[e][4],
          heading: detail[e][0][5],
          date: detail[e][0][1]
        });
    });
    maxOrder.sort((a, b) => {
      if (a.max < b.max)
        return 1;
      else if (a.max > b.max)
        return -1;
      return 0;
    });
    var iStyle = {
      position: 'absolute',
      marginLeft: '-26px',
      marginTop: '11px',
      color: 'white',
      cursor: 'pointer',
      opacity: '0.7',
      transform: this.state.scale,
      transitionDuration: '200ms',
      fontSize: '20px'
    };
    const propsSpots = {
      viewportWidth,
      displayDetail,
      mobile,
      search,
      leftActive
    };
    var spots = maxOrder.map((spot, i) =>
      <LeftPanelSpot
        {...propsSpots}
        spot={spot}
        key={Number(spot.id)}
        index={i}
       />
    );
    return <div className={leftActive ? ' ' : 'active'} id="left-panel">
      <input id="research" type="text" placeholder="Recherche de spots" onChange={this.changeOnResearch}/>
      <i className="fa fa-times-circle" aria-hidden="true" style={iStyle} onClick={this.clearResearch}/>
      <div style={{ overflowY: 'scroll', height: ( viewportHeight - 102 ) + 'px'}}>
        {spots}
     </div>
    </div>;
  }
}

LeftPanel.propTypes = {
  leftActive: PropTypes.bool,
  detail: PropTypes.any,
  displayDetail: PropTypes.any,
  place: PropTypes.object,
  allId: PropTypes.array,
  mobile: PropTypes.bool,
  viewportHeight: PropTypes.number,
  viewportWidth: PropTypes.number
};

export default LeftPanel;
