import React from 'react';
// import PropTypes from 'prop-types';

// import './Shapes.scss';

const propTypes = {};

const defaultProps = {};

function Shapes({}) {
  return (
    <div className="Shapes">
      hi
    </div>
  );
}

Shapes.propTypes = propTypes;
Shapes.defaultProps = defaultProps;

const WorkflowShapes = {
  Circle: 0,
  Rectangle: 1,
  Diamond: 2,
};

export { Shapes, WorkflowShapes };
