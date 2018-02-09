import React from 'react';
// import PropTypes from 'prop-types';

// import './Shapes.scss';

const propTypes = {};

const defaultProps = {};

const WorkflowShapes = {
  Rectangle: 'default-rectangle',
  Circle: 'default-circle',
  Diamond: 'default-diamond',
};

const ShapeParameters = {
  [WorkflowShapes.Rectangle]: {
    width: 120,
    height: 80,
  },
  [WorkflowShapes.Circle]: {
    width: 80,
    height: 80,
  },
  [WorkflowShapes.Diamond]: {
    width: 120,
    height: 80,
  },
};

function Shapes() {
  return (
    <div className="Shapes">
      hi
    </div>
  );
}

Shapes.propTypes = propTypes;
Shapes.defaultProps = defaultProps;

export { WorkflowShapes, ShapeParameters, Shapes };
