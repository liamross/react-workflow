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
  onDelete: PropTypes.func.isRequired,
  endBlock: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  mouse: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
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
  endBlock: null,
  mouse: null,
  className: '',
};

function Path({
  title,
  id,
  startBlock,
  onDelete,
  endBlock,
  mouse,
  // isSelected,
  // isDragging,
  // isInvalid,
  points,
  className,
}) {
  let endBlockOutline = {};
  if (endBlock) {
    // Offset the path slightly from the end block to improve arrow appearance.
    const PATH_END_OFFSET = 8;
    const endBlockX = endBlock.x - PATH_END_OFFSET / 2;
    const endBlockY = endBlock.y - PATH_END_OFFSET / 2;
    const endBlockW = endBlock.width + PATH_END_OFFSET;
    const endBlockH = endBlock.height + PATH_END_OFFSET;
    endBlockOutline = {
      x: endBlockX,
      y: endBlockY,
      width: endBlockW,
      height: endBlockH,
    };
  } else if (mouse) {
    endBlockOutline = {
      ...mouse,
      width: 1,
      height: 1,
    }
  } else {
    console.error('no mouse input or end block provided')
  }

  // Get midpoint of both start and end blocks.
  const startMidPoint = getBlockMidpoint(startBlock);
  const endMidPoint = getBlockMidpoint(endBlockOutline);

  // Get the block-side anchor points for the path.
  const startPoint = getPathBlockIntersection(
    startMidPoint,
    points[0] || endMidPoint,
    startBlock,
  );
  const endPoint = getPathBlockIntersection(
    endMidPoint,
    points[points.length - 1] || startMidPoint,
    endBlockOutline,
  );

  // Create svg d string for path.
  const dString = (
    `M ${startPoint.x} ${startPoint.y} ${
      points.map(point => `L ${point.x} ${point.y} `).join()
      }L ${endPoint.x} ${endPoint.y}`
  );

  return (
    <g
      className={'WorkflowPath __path'
      + (endBlock ? '' : ' WorkflowPath--invalid')
      + (className ? ' ' + className : '')
      }
      id={id}
    >
      <path
        className="WorkflowPath__line"
        d={dString}
        markerEnd="url(#_arrow)"
      />
    </g>
  );
}

Path.propTypes = propTypes;
Path.defaultProps = defaultProps;

export { Path };
