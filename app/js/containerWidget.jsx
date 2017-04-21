import React, { Component, PropTypes } from 'react';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';

class ContainerWidget extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps === this.state) {
      return false;
    } else {
      this.setState(nextProps);
      return true;
    }
  }
  render() {
    const { onePlace, mobile, oneDetail, displayDetail, rightActive, leftActive, viewportWidth, viewportHeight } = this.props;
    var content = <div>
      <InfoWidget place={onePlace} oneDetail={oneDetail}/>
      <Last2HoursWidget detail={oneDetail} />
      <Last24HoursWidget mobile={mobile} detail={oneDetail} />
    </div>;
    var widthContainer;
    var marginLeftContainer;
    if (!leftActive && !rightActive && !mobile) {
      widthContainer = viewportWidth;
      marginLeftContainer = 0;
    } else if (leftActive && !mobile) {
      widthContainer = (viewportWidth - 260) + 'px';
      marginLeftContainer = 260;
    } else if (rightActive && !mobile) {
      widthContainer = (viewportWidth - 260) + 'px';
      marginLeftContainer = 0;
    }

    var heightCoverWidget = {
      height: viewportHeight - 60 + 'px',
      width: widthContainer,
      marginLeft: marginLeftContainer
    };

    return <div id="cover-widgets" style={heightCoverWidget} className={'active'}>
      <div className="container-widgets" id="container-widgets" >
        {displayDetail ? content : ''}
      </div>
    </div>;
  }
}

ContainerWidget.propTypes = {
  mobile: PropTypes.bool,
  leftActive: PropTypes.bool,
  rightActive: PropTypes.bool,
  displayDetail: PropTypes.any,
  onePlace: PropTypes.any,
  oneDetail: PropTypes.array,
  viewportWidth: PropTypes.number,
  viewportHeight: PropTypes.number
};

export default ContainerWidget;
