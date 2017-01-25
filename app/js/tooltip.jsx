import React, { PropTypes } from 'react';
import { windColor } from './common.js';

function Tooltip(props) {
  const detailSplited = props.detail.split('|');
  const styleTooltip = {
    left: '267px',
    marginTop: '-5px',
    background: '#1d1d1d',
    borderRadius: '2px'
  };
  const styleArrow = {
    position: 'absolute',
    transform: 'rotateZ(45deg)',
    width: '10px',
    height: '10px',
    marginTop: '5px',
    marginLeft: '-8px',
    background: '#1d1d1d'
  };
  return <div className="tooltip" style={styleTooltip}>
    <div style={styleArrow} />
    -- {detailSplited[1]} --<br />
    <span style={{color: Math.round((detailSplited[4]/1.852)) < 50 ? windColor[Math.round((detailSplited[4]/1.852))] : windColor[49]}}>max {Math.round(detailSplited[4] / 1.852)} nds</span><br />
    <span style={{color: Math.round((detailSplited[3]/1.852)) < 50 ? windColor[Math.round((detailSplited[3]/1.852))] : windColor[49]}}>moy {Math.round(detailSplited[3] / 1.852)} nds</span><br />
    <span style={{color: Math.round((detailSplited[2]/1.852)) < 50 ? windColor[Math.round((detailSplited[2]/1.852))] : windColor[49]}}>min {Math.round(detailSplited[2] / 1.852)} nds</span><br />
  </div>;
}

Tooltip.propTypes = {
  detail: PropTypes.string
};

export default Tooltip;
