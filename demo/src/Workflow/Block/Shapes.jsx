import React from 'react';
// import PropTypes from 'prop-types';

// import './Shapes.scss';

const propTypes = {};

const defaultProps = {};

const WorkflowShapes = {
  Circle: 'default-circle',
  Rectangle: 'default-rectangle',
  Diamond: 'default-diamond',
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

export { WorkflowShapes, Shapes };
