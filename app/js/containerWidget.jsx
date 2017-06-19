import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfoWidget from './infoWidget.jsx';
import Last2HoursWidget from './last2HoursWidget.jsx';
import Last24HoursWidget from './last24HoursWidget.jsx';

class ContainerWidget extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    if ( nextProps.idUpdate === this.props.displayDetail ||
         nextProps.leftActive !== this.props.leftActive ||
         nextProps.rightActive !== this.props.rightActive ||
         nextProps.displayDetail !== this.props.displayDetail ||
         nextProps.viewportWidth !== this.props.viewportWidth ||
         nextProps.viewportHeight !== this.props.viewportHeight)
      return true;
    else
      return false;
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
