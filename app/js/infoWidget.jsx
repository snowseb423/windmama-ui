import React, { PropTypes } from 'react';
import { Actions } from './store/actions.js';

function InfoWidget(props) {
  const { place } = props;
  const styleCityName = {
    fontFamily: 'Abel',
    fontWeight: 'bolder',
    fontSize: '18px',
    padding: '0 10px'
  };
  if(place) {
    var info = place.split('|')[4] + ', '+ 'Pioupiou: ' + place.split('|')[0];
    if (info.indexOf('Unnamed Road') >= 0)
      info = info.substring(13);
  }
  return <div className="widget" style={{ padding: '10px 0', background: 'rgba(255, 255, 255, 0.25)', color: 'black'}}>
    <div style={{ display: 'inline-block', width: '100%' }}>
      <button className="button" style={{ float: 'left', marginLeft: '10px'}}><i className="fa fa-heart-o" /> favoris</button>
      <button className="button"  style={{ float: 'right', marginRight: '10px'}} onClick={() => Actions.displayDetail(false)}><i className="fa fa-times" /></button>
      <button className="button"  style={{ float: 'right', marginRight: '10px'}} onClick={() => Actions.rightActivation()}> <i className="fa fa-info-circle" /></button>
    </div>
    <div style={styleCityName}>
      {info}
    </div>
  </div>;
}

InfoWidget.propTypes = {
  place: PropTypes.string
};

export default InfoWidget;
