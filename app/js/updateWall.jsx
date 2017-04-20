import React, { PropTypes, Component } from 'react';
import { knots, getColor } from './common.js';

class UpdateWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: this.props.idUpdate,
      rightActive: this.props.rightActive,
      displayDetail: false,
      updates: [],
      key: 0
    };
  }
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.idUpdate !== this.state.lastUpdate ||
      nextProps.rightActive !== this.state.rightActive ||
      nextProps.displayDetail !== this.state.displayDetail
    ) {
      return true;
    } else { return false; }
  }
  componentDidUpdate(prevProps) {
    var updates = this.state.updates;
    const { place, detail } = this.props;
    if (prevProps.idUpdate) {
      var newUpdates = [
        place[prevProps.idUpdate][3],
        detail[prevProps.idUpdate][0][4],
        detail[prevProps.idUpdate][0][5],
        detail[prevProps.idUpdate][0][1],
        this.state.key + 1
      ];
      if (updates.length === 0)
        updates.push(newUpdates);
      else if(updates.length > 0 && newUpdates[0] !== updates[updates.length-1][0])
        updates.push(newUpdates);
      else if(updates.length > 0 && newUpdates[0] === updates[updates.length-1][0])
        updates[updates.length-1] = newUpdates;
      updates.length > 7 ? updates.splice(0, 1) : '';
      this.setState({
        lastUpdate: prevProps.idUpdate,
        rightActive: prevProps.rightActive,
        displayDetail: prevProps.displayDetail,
        updates,
        key: this.state.key + 1
      });
    }
  }
  render() {
    const { updates, displayDetail } = this.state;
    const styleContainer = {
      position: 'absolute',
      right: this.state.rightActive ? 300 : 40,
      top: 120,
      width: 400,
      height: 120,
      transitionDuration: '500ms',
      overflow: 'hidden'
    };
    const styleWall = {
      color: 'white',
      fontSize: '14px',
      textShadow: '0 0 4px #000',
      textAlign: 'right',
      opacity: displayDetail ? 0 : 1
    };
    return <div style={styleContainer}>
      <div style={styleWall}>
        {updates.map((e, i) => {
          const pStyle = {
            transitionDuration: '200ms',
            position: 'absolute',
            width: 400,
            color: getColor(e[1]),
            transform: 'translateY('+ (i-2)*20 +'px)',
            paddingTop: 2,
            fontWeight: 'bold'
          };
          return <p key={e[4]} style={pStyle}>
            {e[3]} - {e[0]} - max {knots(e[1])} nds - {e[2]}°
          </p>;
        })}
      </div>
    </div>;
  }
}

UpdateWall.propTypes = {
  rightActive: PropTypes.bool,
  place: PropTypes.object,
  detail: PropTypes.object,
  idUpdate: PropTypes.any,
  displayDetail: PropTypes.any
};

export default UpdateWall;
