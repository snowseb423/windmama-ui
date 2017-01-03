import React, { PropTypes } from 'react';
import { Actions } from './store/actions.js';
import store from './store/store.js';

function InfoWidget(props) {
  const { idStation } = props;
  const styleCityName = {
    padding: '2px 0',
    fontFamily: 'Abel',
    fontWeight: 'bolder',
    fontSize: '30px',
    float: 'left',
    marginLeft: '10px'
  };
  return <div className="widget" style={{ minHeight: '42px', padding: '10px 0'}}>
    <div style={styleCityName}>{idStation ? ((store.place[idStation]).split('|'))[3] : ' '}</div>
    <div style={{ float: 'right', marginRight: '10px'}}>
      <button className="button">
        <i className="fa fa-heart-o" aria-hidden="true" />
      </button>
      <button className="button"  style={{ marginLeft: '10px' }} onClick={() => Actions.requestDetailOfId(false)}>
        <i className="fa fa-times" aria-hidden="true" />
      </button>
    </div>
  </div>;
}

InfoWidget.propTypes = {
  idStation: PropTypes.any
};

export default InfoWidget;
