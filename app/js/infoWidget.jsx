import React, { PropTypes } from 'react';
import { Actions } from './store/actions.js';
import store from './store/store.js';

function InfoWidget(props) {
  const { idStation } = props;
  var city;
  const styleCityName = {
    fontFamily: 'Abel',
    fontWeight: 'bolder',
    fontSize: '21px',
    marginLeft: '10px',
    padding: '4px 0'
  };
  const styleButton = {
    float: 'right',
    marginRight: '10px'
  }
  if(idStation) {
    city = store.place[idStation].split('|')[3];
    if (city.search('"') > -1) {
      city = city.split('"')[1];
    }
  }
  return <div className="widget" style={{ padding: '10px 0', background: 'rgba(0, 0, 0, 0.35)' }}>
    <div style={{ width: '100%', marginRight: '10px'}}>
      <button className="button"  style={styleButton} onClick={() => Actions.requestDetailOfId(false)}>
        <i className="fa fa-times" />
      </button>
      <button className="button"  style={styleButton} onClick={() => Actions.rightActivation()}>
        <i className="fa fa-info-circle" />
      </button>
      <button className="button" style={styleButton}>
        <i className="fa fa-heart-o" />
      </button>
    </div>
    <div style={styleCityName}>
      {idStation ? city : ' '}
    </div>
  </div>;
}

InfoWidget.propTypes = {
  idStation: PropTypes.any
};

export default InfoWidget;
