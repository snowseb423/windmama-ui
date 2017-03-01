import React, { PropTypes, Component } from 'react';
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
    if (document.getElementById('research').value == '')
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
    const { detail, place, allId, leftActive , mobile} = this.props;
    var maxOrder = [];
      allId.forEach((element) => {
        if (typeof detail[element] !== 'undefined') {
          var max = parseInt(detail[element][0].split('|')[4]);
          var id = (detail[element])[0].split('|')[0];
          maxOrder.push({id: id, max: max});
        }
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
    return <div className={leftActive ? ' ' : 'active'} id="left-panel">
      <input id="research" type="text" placeholder="Recherche (code postal, ville...)" onChange={this.changeOnResearch}/>
      <i className="fa fa-times-circle" aria-hidden="true" style={iStyle} onClick={this.clearResearch}/>
      <div className="container-spot-left-panel">
       {maxOrder.map((item, i) =>
         <LeftPanelSpot key={i} displayDetail={this.props.displayDetail} index={i} mobile={mobile} max={maxOrder[i].max} detail={detail[maxOrder[i].id]} id={maxOrder[i].id} search={this.state.search} place={place[maxOrder[i].id]} {...item} />
       )}
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
  mobile: PropTypes.bool
};

export default LeftPanel;
