import React, { PropTypes } from 'react';

function Detail(props) {
  // const { detail, place, allId } = props.state;
  return <div className="elements-ui-absolute" id="cover-detail">
    <div id="information-detail" className="widget"/>
    <div id="1h-widget-detail" className="widget"/>
    <div id="24h-widget-detail" className="widget"/>
  </div>;
}

Detail.propTypes = {
  state: PropTypes.object,
  detail: PropTypes.object,
  place: PropTypes.object,
  allId: PropTypes.array
};

export default Detail;
