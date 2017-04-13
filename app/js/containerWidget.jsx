import React, { Component, PropTypes } from 'react';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';

class ContainerWidget extends Component {
  constructor(props) {
    super(props);
    const { displayDetail, rightActive, leftActive, viewportWidth, viewportHeight } = this.props;
    this.state = {
      displayDetail,
      rightActive,
      leftActive,
      viewportWidth,
      viewportHeight
    };
  }
  shouldComponentUpdate(nextProps) {
    console.log(nextProps);
    if (nextProps.displayDetail !== this.state.displayDetail ||
      nextProps.rightActive !== this.state.rightActive ||
      nextProps.leftActive !== this.state.leftActive ||
      nextProps.viewportWidth !== this.state.viewportWidth ||
      nextProps.viewportHeight !== this.state.viewportHeight)
      return true;
    else if (nextProps.idUpdate === this.state.displayDetail)
      return true;
    else
      return false;
  }
  componentDidUpdate(prevProps) {
    this.setState({
      displayDetail: prevProps.displayDetail,
      leftActive: prevProps.leftActive,
      rightActive: prevProps.rightActive,
      viewportHeight: prevProps.viewportHeight,
      viewportWidth: prevProps.viewportWidth
    });
  }
  render() {
    const { displayDetail, rightActive, leftActive, viewportWidth, viewportHeight } = this.state;
    const { detail, onePlace, mobile } = this.props;
    console.log(this.props.idUpdate + ' ' + displayDetail);
    var content = <div>
      <InfoWidget place={onePlace} />
      <Last2HoursWidget detail={detail[displayDetail]} />
      <Last24HoursWidget mobile={mobile} detail={detail[displayDetail]} />
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

    return <div id="cover-widgets" style={heightCoverWidget} className={displayDetail ? 'active' : ''}>
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
  detail: PropTypes.any,
  onePlace: PropTypes.any,
  viewportWidth: PropTypes.number,
  viewportHeight: PropTypes.number
};

export default ContainerWidget;
