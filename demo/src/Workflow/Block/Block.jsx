import React from 'react';
import PropTypes from 'prop-types';

import './Block.scss';

const propTypes = {
  // Required.
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  // Not Required.
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

function Block({
  title,
  id,
  isSelected,
  isDragging,
  isInvalid,
  className,
  x,
  y,
  width,
  height,
}) {
  // Set text to center of object.
  const FONT_HEIGHT = 14;
  const fontX = x + width / 2;
  const fontY = y + FONT_HEIGHT / 2 + height / 2;

  return (
    <g
      className={'WorkflowBlock __block'
        + (isSelected ? ' WorkflowBlock--selected' : '')
        + (isDragging ? ' WorkflowBlock--dragging' : '')
        + (isInvalid ? ' WorkflowBlock--invalid' : '')
        + (className ? ' ' + className : '')
      }
      id={id}
    >
      <rect
        className="WorkflowBlock__background"
        x={x}
        y={y}
        width={width}
        height={height}
      />
      <text
        className="WorkflowBlock__text"
        x={fontX}
        y={fontY}
        textAnchor="middle"
        fontSize="14"
      >
        {title}
      </text>
    </g>
  );
}

Block.propTypes = propTypes;
Block.defaultProps = defaultProps;

export { Block };
