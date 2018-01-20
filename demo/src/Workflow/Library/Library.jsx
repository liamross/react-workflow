import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WorkflowShapes } from '../Block/Shapes';

import './Library.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {};

class Library extends PureComponent {
  render() {
    return(
      <div className="WorkflowLibrary">
        <div onClick={(evt) => this.props.onClick(evt, WorkflowShapes.Rectangle)} >
          Rectangle
        </div>
        <div onClick={(evt) => this.props.onClick(evt, WorkflowShapes.Circle)} >
          Circle
        </div>
        <div onClick={(evt) => this.props.onClick(evt, WorkflowShapes.Diamond)} >
          Diamond
        </div>
      </div>
    )
  }
}

Library.propTypes = propTypes;
Library.defaultProps = defaultProps;
export { Library };