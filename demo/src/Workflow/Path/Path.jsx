import React from 'react';
import PropTypes from 'prop-types';

import './Path.scss';

const propTypes = {
  // Required.
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ),
  // Not Required.
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

function Path({
  title,
  id,
  isSelected,
  isDragging,
  isInvalid,
  points,
  className,
}) {
  const pathString = points
    .map((point, index) => (
      `${index ? 'P' : 'M'} ${point.x} ${point.y}`
    ))
    .join(' ');

  return (
    <g
      className={'WorkflowPath _draggable'
        + (isSelected ? ' WorkflowPath--selected' : '')
        + (isDragging ? ' WorkflowPath--dragging' : '')
        + (isInvalid ? ' WorkflowPath--invalid' : '')
        + (className ? ' ' + className : '')
      }
      id={id}
    >
      <path
        class="WorkflowPath__line"
        d={pathString}
      />
    </g>
  );
}

Path.propTypes = propTypes;
Path.defaultProps = defaultProps;

export { Path };
