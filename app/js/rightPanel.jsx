import React, { PropTypes, Component } from 'react';

class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.active !== this.state.active)
      return true;
    else if (nextProps.active === this.state.active)
      return false;
  }
  componentDidUpdate(prevProps) {
    this.setState({active: prevProps.active});
  }
  render() {
    return <div className={this.state.active ? ' ' : 'active'} id="right-panel">
      <div style={{padding: '10px', color: '#ccc'}}>
        <h1 style={{color: '#DDD'}}>Observation du vent en temps réel.</h1>
        Windmama recense les données météorologiques du
        réseau d'anémomètres <a href="http://pioupiou.fr" target="_blank">Pioupiou</a> en temps réel.<br /><br />
        Prochainement Windmama recensera d'autres sources météo traitant du vent, et
        proposera des prévisions sur les spots couvert par un dispositif d'observation.
      </div>
      <div className="link-container">
        <div style={{height: '30px', padding: '10px 0'}}>
          <a style={{width: '100%'}} href="http://pioupiou.fr/" target="_blank" >
            <img src="img/pioupiou-logo.svg" alt="" width="100%" height="100%"/>
          </a>
        </div>
        <button style={{width: '100%', padding: '10px'}}>
          <a href="mailto:benoit.arguel@gmail.com" style={{color: 'white', textDecoration: 'none'}}>
            contact <i className="fa fa-envelope-o" aria-hidden="true" />
          </a>
        </button>
      </div>
    </div>;
  }
}

RightPanel.propTypes = {
  active: PropTypes.bool
};

export default RightPanel;
