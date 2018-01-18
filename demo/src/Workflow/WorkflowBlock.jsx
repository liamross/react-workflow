import React from 'react';
import PropTypes from 'prop-types';

import './WorkflowBlock.scss';

const propTypes = {
  //
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  //
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

function WorkflowBlock({
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

  const FONT_HEIGHT = 14;
  const fontX = x + width / 2;

  const fontY = y + FONT_HEIGHT / 2 + height / 2;

  return (
    <g
      className={'WorkflowBlock _draggable'
      + (isSelected ? ' WorkflowBlock--selected' : '')
      + (isDragging ? ' WorkflowBlock--dragging' : '')
      + (isInvalid ? ' WorkflowBlock--invalid' : '')
      + (className ? ' ' + className : '')
      }
      id={id}
    >
      <rect
        className="WorkflowBlock__background"
        width={width}
        height={height}
        x={x}
        y={y}
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

WorkflowBlock.propTypes = propTypes;
WorkflowBlock.defaultProps = defaultProps;

export { WorkflowBlock };