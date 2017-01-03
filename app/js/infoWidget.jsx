import React, { PropTypes } from 'react';
import { Actions } from './store/actions.js';
import store from './store/store.js';

function InfoWidget(props) {
  const { id } = props;
  const styleCityName = {
    padding: '2px 0',
    fontFamily: 'Abel',
    fontWeight: 'bolder',
    fontSize: '30px',
    float: 'left'
  };
  return <div className="widget" style={{ minHeight: '42px'}}>
    <div style={styleCityName}>{id ? ((store.place[id]).split('|'))[3] : ' '}</div>
    <div style={{ float: 'right'}}>
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
  id: PropTypes.any
};

export default InfoWidget;
