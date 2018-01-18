import React from 'react';
import PropTypes from 'prop-types';
import { getBlockMidpoint } from '../Utilities/workflowUtils';

import './Path.scss';

const propTypes = {
  // Required.
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  startBlock: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  endBlock: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  // isSelected: PropTypes.bool.isRequired,
  // isDragging: PropTypes.bool.isRequired,
  // isInvalid: PropTypes.bool.isRequired,
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
  startBlock,
  endBlock,
  // isSelected,
  // isDragging,
  // isInvalid,
  points,
  className,
}) {
  const startPoint = getBlockMidpoint(startBlock);
  const endPoint = getBlockMidpoint(endBlock);
  const dString = (
    `M ${startPoint.x} ${startPoint.y} ${
    points.map(point => `L ${point.x} ${point.y} `).join()
    }L ${endPoint.x} ${endPoint.y}`
  );

  /*
          + (isSelected ? ' WorkflowPath--selected' : '')
          + (isDragging ? ' WorkflowPath--dragging' : '')
          + (isInvalid ? ' WorkflowPath--invalid' : '')
  */
  return (
    <g
      className={'WorkflowPath __path'
        + (className ? ' ' + className : '')
      }
      id={id}
    >
      <path
        className="WorkflowPath__line"
        fill="none"
        stroke="#555"
        strokeWidth="4px"
        strokeLinecap="round"
        d={dString}
      />
    </g>
  );
}

Path.propTypes = propTypes;
Path.defaultProps = defaultProps;

export { Path };
