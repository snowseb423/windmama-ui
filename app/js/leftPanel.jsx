import React, { PropTypes, Component } from 'react';
import LeftPanelSpot from './leftPanelSpot.jsx';

class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.changeOnResearch = this.changeOnResearch.bind(this);
    this.state = props.data;
  }
  changeOnResearch(){
    this.setState({search: document.getElementById('research').value});
  }
  render() {
    const { detail, place, allId, leftActive , mobile} = this.state;
    var maxOrder = [];
    for (var i = 0; i < allId.length; i++) {
      var max = parseInt(((detail[allId[i]])[0].split('|'))[4]);
      var id = (detail[allId[i]])[0].split('|')[0];
      maxOrder.push({id: id, max: max});
    }
    maxOrder.sort((a, b) => {
      if (a.max < b.max)
      return 1;
      if (a.max > b.max)
      return -1;
      return 0;
    });
    return <div className={leftActive ? ' ' : 'active'} id="left-panel">
      <input id="research" type="text" placeholder="Recherche" onChange={this.changeOnResearch}/>
      <div className="container-spot-left-panel">
       {maxOrder.map((item, i) =>
         <LeftPanelSpot key={i} index={i} mobile={mobile} max={maxOrder[i].max} detail={detail[maxOrder[i].id]} search={this.state.search} place={place[maxOrder[i].id]} {...item} />
       )}
      </div>
    </div>;
  }
}

LeftPanel.propTypes = {
  data: PropTypes.object
};

export default LeftPanel;
