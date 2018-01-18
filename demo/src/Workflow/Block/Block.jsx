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
  // Object grows slightly if dragging.
  const DRAG_GROWTH = 6;
  const objectX = isDragging ? (x - DRAG_GROWTH / 2) : x;
  const objectY = isDragging ? (y - DRAG_GROWTH / 2) : y;
  const objectW = isDragging ? (width + DRAG_GROWTH) : width;
  const objectH = isDragging ? (height + DRAG_GROWTH) : height;

  // Set text to center of object.
  const FONT_HEIGHT = 14;
  const fontX = objectX + objectW / 2;
  const fontY = objectY + FONT_HEIGHT / 2 + objectH / 2;

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
        x={objectX}
        y={objectY}
        width={objectW}
        height={objectH}
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
