import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from './store/actions.js';

class LeftPanelSpot extends Component {
  constructor(props) {
    super(props);
  }
  sumFunc(id) {
    if (!this.props.mobile && !this.props.displayDetail)
      Actions.displayDetail(id);
    else if (this.props.mobile) {
      Actions.leftActivation();
      Actions.displayDetail(id);
    } else
      Actions.displayDetail(id);
  }
  render() {
    const { search, id } = this.props;
    const city = this.props.city.split(',')[1];
    var displaySpot = { display: 'inherit' };

    if (search === '' || search === false)
      displaySpot.display = 'none';
    else if (city.indexOf(search) >= 0 || city.toLowerCase().indexOf(search) >= 0 || search === undefined)
      displaySpot.display = 'inherit';
    else
      displaySpot.display = 'none';

    return <div style={displaySpot} onClick={() => this.sumFunc(id)} onMouseOver={() => Actions.hoverId(this.props.id)}>
      {city}
    </div>;
  }
}

LeftPanelSpot.propTypes = {
  mobile: PropTypes.bool,
  search: PropTypes.any,
  displayDetail: PropTypes.any,
  id: PropTypes.string,
  city: PropTypes.string
};

export default LeftPanelSpot;
