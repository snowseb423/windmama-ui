import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from './store/actions.js';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

// moment.utc(moment()
//       .diff(moment(moment(this.props.oneDetail[0][1], moment.ISO_8601).format())))
//       .format('HH:mm:ss')

class InfoWidget extends Component {
  constructor(props) {
    super(props);
    this.updateTime = this.updateTime.bind(this);
    this.state = {
      last: this.props.oneDetail[0][1],
      diff: moment.utc(moment().format()
                  .diff(moment(moment(this.props.oneDetail[0][1], moment.ISO_8601).format())))
                  .format('HH:mm:ss')
    };
  }
  componentWillMount() {
    this.updateTime();
  }
  shouldComponentUpdate() {
    return true;
  }
  updateTime() {
    // setInterval(() => {
    //   this.setState({
    //     diff: moment(this.state.diff).add(1, 'seconds')
    //   });
    // }, 1000);
  }
  render() {
    const { place } = this.props;
    const styleCityName = {
      fontFamily: 'Abel',
      fontSize: '18px',
      padding: '0 10px'
    };
    return <div className="widget" style={{ padding: '10px 0', background: 'rgba(255, 255, 255, 0.25)', color: '#fff'}}>
      <div style={{ display: 'inline-block', width: '100%' }}>
        <button className="button" style={{ opacity: '0.4', float: 'left', marginLeft: '10px'}} onClick={() => alert('Cette fonction sera bientôt disponible')}><i className="fa fa-heart-o" /> favoris</button>
        <button className="button"  style={{ float: 'right', marginRight: '10px'}} onClick={() => Actions.displayDetail(false)}><i className="fa fa-times" /></button>
      </div>
      <div style={styleCityName}>
        {place[4] + ', '}<a href={'http://pioupiou.fr/fr/' + place[0]} target="_blan">Pioupiou_n°{place[0]}</a><br/>
        {'Dernier relevé à ' + moment(this.state.last).format('HH:mm') + ' le ' + moment(this.state.last).format('D MMMM') + '. Il y a '+ moment(this.state.diff).format('HH:mm:ss')}
      </div>
    </div>;
  }
}

InfoWidget.propTypes = {
  place: PropTypes.any,
  oneDetail: PropTypes.array
};

export default InfoWidget;
