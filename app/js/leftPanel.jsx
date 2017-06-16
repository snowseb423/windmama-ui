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
    const { mobile, place, allId, leftActive, displayDetail } = this.props;
    const { search } = this.state;
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
    return <div className={leftActive ? ' ' : 'active'} id="left-panel">
      <input id="research" type="text" placeholder="Recherche de spots" onChange={this.changeOnResearch}/>
      <i className="fa fa-times-circle" aria-hidden="true" style={iStyle} onClick={this.clearResearch}/>
      <div>
        {allId.map((e, key)=>{
          const propsSpot = {
            key,
            mobile,
            search,
            displayDetail,
            id: place[e][0],
            city: place[e][4]
          };
          return <LeftPanelSpot {...propsSpot}/>;
        })}
      </div>
    </div>;
  }
}

LeftPanel.propTypes = {
  leftActive: PropTypes.bool,
  place: PropTypes.object,
  allId: PropTypes.array,
  mobile: PropTypes.bool,
  displayDetail: PropTypes.any
};

export default LeftPanel;
