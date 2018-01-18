import React from 'react';
import PropTypes from 'prop-types';
import {
  getBlockMidpoint, getPathBlockIntersection,
} from '../Utilities/workflowUtils';

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
  // const DRAG_GROWTH = 6;
  // const endBlockX = endBlock.x - DRAG_GROWTH / 2;
  // const endBlockY = endBlock.y - DRAG_GROWTH / 2;
  // const endBlockW = endBlock.width + DRAG_GROWTH;
  // const endBlockH = endBlock.height + DRAG_GROWTH;

  // const endBlockOutline = {
  //   x: endBlockX,
  //   y: endBlockY,
  //   width: endBlockW,
  //   height: endBlockH,
  // }

  const startMidPoint = getBlockMidpoint(startBlock);
  const endMidPoint = getBlockMidpoint(endBlock);

  const startPoint = getPathBlockIntersection(startMidPoint, endMidPoint, startBlock);
  const endPoint = getPathBlockIntersection(endMidPoint, startMidPoint, endBlock);

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
        stroke="#333"
        strokeWidth="2px"
        strokeLinecap="round"
        d={dString}
        markerEnd="url(#_arrow)"
      />
    </g>
  );
}

Path.propTypes = propTypes;
Path.defaultProps = defaultProps;

export { Path };
