import React, { Component } from 'react';
import store from './store/store.js';
import { typeOfActions } from './store/actions.js';
import LeftPanelSpot from './leftPanelSpot.jsx';


class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.updateStatePanel = this.updateStatePanel.bind(this);
    this.changeOnResearch = this.changeOnResearch.bind(this);
    this.state = store;
  }
  componentDidMount() {
    store.on(typeOfActions.LEFT_ACTIVATION, this.updateStatePanel);
    store.on(typeOfActions.RIGHT_ACTIVATION, this.updateStatePanel);
    store.on(typeOfActions.UPDATE_DETAIL, this.updateStatePanel);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.LEFT_ACTIVATION, this.updateStatePanel);
    store.removeListener(typeOfActions.RIGHT_ACTIVATION, this.updateStatePanel);
    store.removeListener(typeOfActions.UPDATE_DETAIL, this.updateStatePanel);
  }
  updateStatePanel() {
    this.setState(store);
  }
  changeOnResearch(){
    this.setState({search: document.getElementById('research').value});
  }
  render() {
    const { detail, place, allId, leftActive } = this.state;
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
      <input id="research" type="text" placeholder="Recherche par ville ou code postal." onChange={this.changeOnResearch}/>
      <div className="container-spot-left-panel">
       {maxOrder.map((item, i) =>
         <LeftPanelSpot key={i} index={i} max={maxOrder[i].max} detail={detail[maxOrder[i].id]} search={this.state.search} place={place[maxOrder[i].id]} {...item} />
       )}
      </div>
    </div>;
  }
}

export default LeftPanel;
