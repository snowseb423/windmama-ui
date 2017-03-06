import React, { PropTypes } from 'react';
import { windColor } from './common.js';

function Tooltip(props) {
  const detailSplited = props.detail.split('|');
  var styleTooltip, styleArrow;
  var evt = event || window.event;
  if (props.position === 'left') {
    styleTooltip = {
      left: '267px',
      top: (props.index*29) + 103 - document.querySelector('.container-spot-left-panel').scrollTop +'px',
      borderRadius: '2px',
      zIndex: '4',
      fontSize: '12px',
      background: '#1d1d1d',
      color: 'rgba(255,255,255,0.7)',
      width: '80px',
      overflow: 'inherit'
    };
    styleArrow = {
      marginTop: '5px',
      marginLeft: '-8px',
      position: 'absolute',
      transform: 'rotateZ(45deg)',
      width: '10px',
      height: '10px',
      background: '#1d1d1d'
    };
  } else if (props.position === 'map') {
    styleTooltip = {
      left: evt.clientX - 46 + 'px',
      marginTop: evt.clientY - 90 + 'px',
      borderRadius: '2px',
      zIndex: '4',
      fontSize: '12px',
      background: '#1d1d1d',
      color: 'rgba(255,255,255,0.7)',
      width: '80px'
    };
    styleArrow = {
      marginTop: '67px',
      marginLeft: '36px',
      position: 'absolute',
      transform: 'rotateZ(45deg)',
      width: '10px',
      height: '10px',
      background: '#1d1d1d'
    };
  }
  return <div className="tooltip" style={styleTooltip}>
    <div style={styleArrow} />
    -- {detailSplited[1]} --<br />
    <span style={{color: Math.round((detailSplited[4]/1.852)) < 50 ? windColor[Math.round((detailSplited[4]/1.852))] : windColor[49]}}>max {Math.round(detailSplited[4] / 1.852)} nds</span><br />
    <span style={{color: Math.round((detailSplited[3]/1.852)) < 50 ? windColor[Math.round((detailSplited[3]/1.852))] : windColor[49]}}>moy {Math.round(detailSplited[3] / 1.852)} nds</span><br />
    <span style={{color: Math.round((detailSplited[2]/1.852)) < 50 ? windColor[Math.round((detailSplited[2]/1.852))] : windColor[49]}}>min {Math.round(detailSplited[2] / 1.852)} nds</span><br />
  </div>;
}

Tooltip.propTypes = {
  detail: PropTypes.string,
  index: PropTypes.number,
  position: PropTypes.string
};

export default Tooltip;
