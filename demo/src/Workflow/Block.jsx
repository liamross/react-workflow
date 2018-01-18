import React from 'react';
import PropTypes from 'prop-types';

import './Block.scss';

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

  const rectX = isDragging ? (x - 2) : x;
  const rectY = isDragging ? (y - 2) : y;
  const rectW = isDragging ? (width + 4) : width;
  const rectH = isDragging ? (height + 4) : height;

  const FONT_HEIGHT = 14;
  const fontX = rectX + rectW / 2;
  const fontY = rectY + FONT_HEIGHT / 2 + rectH / 2;

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
        x={rectX}
        y={rectY}
        width={rectW}
        height={rectH}
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