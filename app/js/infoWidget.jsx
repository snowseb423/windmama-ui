import React, { PropTypes } from 'react';
import { Actions } from './store/actions.js';
import moment from 'moment';

function InfoWidget(props) {
  const { place, oneDetail } = props;
  const styleCityName = {
    fontFamily: 'Abel',
    fontWeight: 'bolder',
    fontSize: '18px',
    padding: '0 10px'
  };
  if(place) {
    const day = moment(Date.now()).format('D MMMM') === oneDetail[0][1][0] ? 'Aujourd\'hui' : 'le ' + oneDetail[0][1][0];
    var info = <div style={styleCityName}>
      {place[4] + ', '}<a href={'http://pioupiou.fr/fr/' + place[0]} target="_blan">Pioupiou_n°{place[0]}</a><br/>
      {'Dernier relevé ' + day + ' à ' + oneDetail[0][1][1]}
    </div>;
    if (place[4].indexOf('Unnamed Road') >= 0) {
      info = <div style={styleCityName}>
        {place[4].substring(13) + ', '}<a href={'http://pioupiou.fr/fr/' + place[0]} target="_blan">Pioupiou_n°{place[0]}</a><br/>
        {'Dernier relevé ' + day + ' à ' + oneDetail[0][1][1]}
      </div>;
    }
  }
  return <div className="widget" style={{ padding: '10px 0', background: 'rgba(255, 255, 255, 0.25)', color: '#fff'}}>
    <div style={{ display: 'inline-block', width: '100%' }}>
      <button className="button" style={{ opacity: '0.4', float: 'left', marginLeft: '10px'}} onClick={() => alert('Cette fonction sera bientôt disponible')}><i className="fa fa-heart-o" /> favoris</button>
      <button className="button"  style={{ float: 'right', marginRight: '10px'}} onClick={() => Actions.displayDetail(false)}><i className="fa fa-times" /></button>
    </div>
    {info}
  </div>;
}

InfoWidget.propTypes = {
  place: PropTypes.any,
  oneDetail: PropTypes.array
};

export default InfoWidget;
