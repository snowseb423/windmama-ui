import React, { Component, PropTypes } from 'react';
import store from './store/store.js';
import { Dispatcher } from 'flux';


// Instance unique du dispatcher
var AppDispatcher = new Dispatcher();

// Constantes pour éviter de devoir réécrire des chaines de caractères
var typeOfActions = {
  LEFT_ACTIVATION: 'LEFT_ACTIVATION',
  RIGHT_ACTIVATION: 'RIGHT_ACTIVATION'
};

// Actions
var Actions = {
  leftActivation: () => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.LEFT_ACTIVATION
    });
  },
  rightActivation: () => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.RIGHT_ACTIVATION
    });
  }
};

//Ecoute du dispatcher par le store.
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case typeOfActions.LEFT_ACTIVATION:
      store.leftActive = !store.leftActive;
      store.rightActive = false;
      break;
    case typeOfActions.RIGHT_ACTIVATION:
      store.rightActive = !store.rightActive;
      store.leftActive = false;
      break;
    default:
      break;
  }
});


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftActive: this.props.leftActive,
      rightActive: this.props.rightActive
    };
  }
  componentDidMount() {
    store.on(typeOfActions.LEFT_ACTIVATION, this.statePanels);
    store.on(typeOfActions.RIGHT_ACTIVATION, this.statePanels);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.LEFT_ACTIVATION, this.statePanels);
    store.removeListener(typeOfActions.RIGHT_ACTIVATION, this.statePanels);
  }
  statePanels() {
    this.setState({
      leftActive: store.leftActive,
      rightActive: store.rightActive
    });
  }
  menuClicked(side) {
    if (side === 'left')
      Actions.leftActivation();
    else if (side === 'right')
      Actions.rightActivation();
  }
  render() {
    return <div id="header" className="elements-ui-absolute">
      <div className={this.state.leftActive ? 'container-left-menu button clicked' : 'container-left-menu button'} onClick={() => this.menuClicked('left')}>
        <i className="fa fa-arrow-down" aria-hidden="true" />
      </div>
      <h1>WindMama.fr</h1>
      <div className={this.state.rightActive ? 'container-right-menu button clicked' : 'container-right-menu button'} onClick={() => this.menuClicked('right')}>
        <div/>
        <div/>
      </div>
    </div>;
  }
}
Header.propTypes = {
  rightActive: PropTypes.bool,
  leftActive: PropTypes.bool
};

export default Header;
