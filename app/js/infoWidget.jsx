import React, { PropTypes } from 'react';
import { Actions } from './store/actions.js';
import store from './store/store.js';
import { readCookie } from './common.js';

function addBookmark(id) {
  if (navigator.cookieEnabled) {
    var bookmarksId = readCookie('bookmarks');
    if(!bookmarksId)
      document.cookie = 'bookmarks=' + id + '; expires=Thu, 01 jan 2030 00:00:00 UTC; path=/';
    else if (bookmarksId)
      document.cookie = 'bookmarks=' + id + '|' + bookmarksId + '; expires=Thu, 01 jan 2030 00:00:00 UTC; path=/';
    if (!store.rightActive) {
      Actions.rightActivation();
    }
  } else {
    alert('Vous devez autoriser les cookies pour utiliser cette fonction.');
  }
}

function InfoWidget(props) {
  const { idStation } = props;
  const styleCityName = {
    fontFamily: 'Abel',
    fontWeight: 'bolder',
    fontSize: '18px',
    padding: '0 10px'
  };
  if(idStation) {
    var info = store.place[idStation].split('|')[4] + ', '+ 'Pioupiou: ' + store.place[idStation].split('|')[0];
    if (info.indexOf('Unnamed Road') >= 0) {
      info = info.substring(13);
    }
  }
  return <div className="widget" style={{ padding: '10px 0', background: 'rgba(255, 255, 255, 0.25)', color: 'black'}}>
    <div style={{ display: 'inline-block', width: '100%' }}>
      <button className="button" style={{ float: 'left', marginLeft: '10px'}} onClick={() => addBookmark(idStation)}><i className="fa fa-heart-o" /> favoris</button>
      <button className="button"  style={{ float: 'right', marginRight: '10px'}} onClick={() => Actions.displayDetail(false)}><i className="fa fa-times" /></button>
      <button className="button"  style={{ float: 'right', marginRight: '10px'}} onClick={() => Actions.rightActivation()}> <i className="fa fa-info-circle" /></button>
    </div>
    <div style={styleCityName}>
      {idStation ? info : ' '}
    </div>
  </div>;
}

InfoWidget.propTypes = {
  idStation: PropTypes.any
};

export default InfoWidget;
