import React, { PropTypes, Component } from 'react';
import LeftPanelSpot from './leftPanelSpot.jsx';
import ScrollArea from 'react-scrollbar';

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
    const { detail, place, allId, leftActive , mobile, viewportHeight} = this.props;
    var maxOrder = [];
    allId.forEach((e) => {
      if (typeof detail[e] !== 'undefined')
        maxOrder.push({
          id: detail[e][0][0],
          max: parseInt(detail[e][0][4], 10)
        });
    });
    maxOrder.sort((a, b) => {
      if (a.max < b.max)
        return 1;
      else if (a.max > b.max)
        return -1;
      return 0;
    });
    console.log(maxOrder);
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
      <ScrollArea smoothScrolling={true} speed={0.8} className="area" contentClassName="content" horizontal={false} style={{ height: ( viewportHeight - 102 ) + 'px'}}>
       {maxOrder.map((item, i) =>
         <LeftPanelSpot key={i} displayDetail={this.props.displayDetail} index={i} mobile={mobile} max={maxOrder[i].max} detail={detail[maxOrder[i].id]} id={maxOrder[i].id} search={this.state.search} place={place[maxOrder[i].id]} {...item} />
       )}
      </ScrollArea>
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
  viewportHeight: PropTypes.number
};

export default LeftPanel;
