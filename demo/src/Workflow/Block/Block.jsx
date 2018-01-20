import React from 'react';
import PropTypes from 'prop-types';
import { WorkflowShapes } from './Shapes';

import './Block.scss';

const propTypes = {
  // Required.
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
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
  shape,
  isSelected,
  isDragging,
  isHighlighted,
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
            width={width}
            height={height}
          />
        )
        : shape === WorkflowShapes.Circle
          ? (
            <circle
              className="WorkflowBlock__background"
              cx={x + width / 2}
              cy={y + width / 2}
              r={width / 2}
            />
          )
          : shape === WorkflowShapes.Diamond
            ? (
              <polygon
                className="WorkflowBlock__background"
                points={`${
                  x + width / 2
                  },${
                  y
                  } ${
                  x
                  },${
                  y + height / 2
                  } ${
                  x + width / 2
                  },${
                  y + height
                  } ${
                  x + width
                  },${
                  y + height / 2
                  }`
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
