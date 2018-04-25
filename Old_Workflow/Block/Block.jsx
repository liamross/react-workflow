import React from 'react';
import PropTypes from 'prop-types';
import { WorkflowShapes, ShapeParameters } from './Shapes';

import './Block.scss';

const propTypes = {
  // Required.
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  shape: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  // Not Required.
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

function Block({
  title,
  id,
  shape,
  isSelected,
  isDragging,
  isHighlighted,
  isInvalid,
  className,
  x,
  y,
}) {
  // Set text to center of object.
  const { width, height } = ShapeParameters[shape];
  const FONT_HEIGHT = 14;
  const fontX = x + width / 2;
  const fontY = y + FONT_HEIGHT / 2 + height / 2;

  return (
    <g
      className={'WorkflowBlock __block'
        + (isSelected ? ' WorkflowBlock--selected' : '')
        + (isDragging ? ' WorkflowBlock--dragging' : '')
        + (isHighlighted ? ' WorkflowBlock--highlighted' : '')
        + (isInvalid ? ' WorkflowBlock--invalid' : '')
        + (className ? ' ' + className : '')
      }
      id={id}
    >
      {shape === WorkflowShapes.Rectangle
        ? (
          <rect
            className="WorkflowBlock__background"
            x={x}
            y={y}
            width={120}
            height={80}
          />
        )
        : shape === WorkflowShapes.Circle
          ? (
            <circle
              className="WorkflowBlock__background"
              cx={x + 40}
              cy={y + 40}
              r={40}
            />
          )
          : shape === WorkflowShapes.Diamond
            ? (
              <polygon
                className="WorkflowBlock__background"
                points={
                  `${x+60},${y} ${x},${y+40} ${x+60},${y+80} ${x+120},${y+40}`
                }
              />
            )
            : ''
      }
      <text
        className="WorkflowBlock__text"
        x={fontX}
        y={fontY}
        textAnchor="middle"
        fontSize={FONT_HEIGHT}
      >
        {title}
      </text>
    </g>
  );
}

Block.propTypes = propTypes;
Block.defaultProps = defaultProps;

export { Block };
