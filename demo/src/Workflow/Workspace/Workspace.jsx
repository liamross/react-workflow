import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Block } from '../Block/Block';
import { BlockOverlay } from './WorkspaceOverlay/BlockOverlay';
import { Path } from '../Path/Path';
import {
  isBlockColliding,
  roundToNearest,
  blockToFront,
} from '../Utilities/workflowUtils';

import './Workspace.scss';

// TODO: add some form of submission.
const propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  ).isRequired,
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      startBlockId: PropTypes.string,
      endBlockId: PropTypes.string,
      points: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  gridSize: PropTypes.number.isRequired,
  allowAdjacentBlocks: PropTypes.bool.isRequired,
  workspaceClassName: PropTypes.string.isRequired,
};

const defaultProps = {};

class Workspace extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      width: '1300px',
      height: '900px',
      blocks: props.blocks,
      paths: props.paths,
      tempPath: null,
      selected: '',
      dragging: '',
      cursorOutsideWorkspace: false,
      isOverlapping: false,
    };

    // Reference to svg workspace.
    this.workspace = null;

    // Keeps track of original mouse and block coordinates.
    this.originalMouseCoordinates = {}; // {x: number, y: number}
    this.originalBlockCoordinates = {}; // {x: number, y: number}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      blocks: nextProps.blocks,
      paths: nextProps.paths,
    });
  }

  componentWillUnmount() {
    // Remove listeners and reset coordinates if component unmounts mid-move.
    this.resetDrag();
  }

  handleBlockMouseDown = evt => {
    const { gridSize } = this.props;
    const { blocks } = this.state;
    const target = evt.target.parentElement;
    const targetClass = target.getAttribute('class');

    if (targetClass && targetClass.includes('__block')) {
      // If click is on draggable component, begin dragging, remove selection,
      // and set dragged block to top (bottom of blocks array).
      const targetId = target.getAttribute('id');
      const newBlocks = blockToFront(targetId, blocks);
      this.setState({
        ...this.state,
        selected: '',
        dragging: targetId,
        blocks: newBlocks,
      });

      // Store original mouse coordinates.
      this.originalMouseCoordinates.x = evt.clientX;
      this.originalMouseCoordinates.y = evt.clientY;

      // Store original block coordinates (to nearest grid).
      const block = blocks.find(bl => bl.id === targetId);
      this.originalBlockCoordinates.x = roundToNearest(block.x, gridSize);
      this.originalBlockCoordinates.y = roundToNearest(block.y, gridSize);

      // Initialize mouse listeners for document and workspace.
      document.addEventListener('mousemove', this.handleBlockDrag);
      document.addEventListener('mouseup', this.handleBlockPlace);
      if (this.workspace) {
        this.workspace.addEventListener('mouseleave', this.handleMouseLeave);
        this.workspace.addEventListener('mouseenter', this.handleMouseEnter);
      }
    } else {
      // If click is on non-draggable component, deselect any selected blocks.
      this.setState({
        ...this.state,
        selected: '',
      });
    }
  };

  handleBlockDrag = evt => {
    const { gridSize, allowAdjacentBlocks } = this.props;
    const { blocks, dragging } = this.state;

    if (dragging) {
      // Find mouse deltas vs original coordinates.
      const mouseDeltaX = this.originalMouseCoordinates.x - evt.clientX;
      const mouseDeltaY = this.originalMouseCoordinates.y - evt.clientY;

      // Find new block coordinates (round mouse delta).
      const blockX = this.originalBlockCoordinates.x - roundToNearest(
        mouseDeltaX,
        gridSize,
      );
      const blockY = this.originalBlockCoordinates.y - roundToNearest(
        mouseDeltaY,
        gridSize,
      );

      // Check if dragged block is overlapping.
      const currentBlockIndex = blocks.findIndex(bl => bl.id === dragging);
      const draggedBlock = {
        ...blocks[currentBlockIndex],
        x: blockX,
        y: blockY,
      };
      const isOverlapping = blocks.some((block, index) => (
        index !== currentBlockIndex
        && isBlockColliding(
          draggedBlock,
          block,
          gridSize,
          allowAdjacentBlocks,
        )
      ));

      this.setState({
        ...this.state,
        blocks: [
          ...blocks.slice(0, currentBlockIndex),
          draggedBlock,
          ...blocks.slice(currentBlockIndex + 1),
        ],
        isOverlapping,
      });
    } else {
      console.error(
        'Not in dragging state.'
        + '\nThis is likely an async issue...'
        + '\nCurrent state:\n', this.state,
      );
    }
  };

  handleBlockPlace = () => {
    const {
      blocks,
      dragging,
      cursorOutsideWorkspace,
      isOverlapping,
    } = this.state;
    const isInvalid = cursorOutsideWorkspace || isOverlapping;

    if (isInvalid && dragging) {
      // Select draggable component, reset dragging and invalid states, and
      // reset dragged block to original coordinates.
      this.setState({
        ...this.state,
        selected: dragging,
        dragging: '',
        cursorOutsideWorkspace: false,
        isOverlapping: false,
        blocks: blocks.map(block => block.id === dragging
          ? {
            ...block,
            x: this.originalBlockCoordinates.x,
            y: this.originalBlockCoordinates.y,
          }
          : block,
        ),
      });
    } else {
      // Select draggable component, reset dragging and invalid states.
      this.setState({
        selected: dragging,
        dragging: '',
        cursorOutsideWorkspace: false,
        isOverlapping: false,
      });
    }

    // Remove listeners and reset coordinates.
    this.resetDrag();
  };

  handlePathMouseDown = (evt, id) => {
    const { gridSize } = this.props;

    // Set temporary path.
    this.setState({
      ...this.state,
      tempPath: {
        title: '',
        startBlockId: id,
        endBlockId: '',
        mouse: {
          x: roundToNearest(evt.clientX, gridSize),
          y: roundToNearest(evt.clientY, gridSize),
        },
        points: [],
      },
    });

    // Initialize mouse listeners for document and workspace.
    document.addEventListener('mousemove', this.handlePathDrag);
    document.addEventListener('mouseup', this.handlePathPlace);
  };

  handlePathDrag = evt => {
    const { gridSize } = this.props;
    const { blocks, tempPath } = this.state;

    if (tempPath) {
      // Check if dragged block is overlapping.
      const draggedPath = {
        x: evt.clientX,
        y: evt.clientY,
        width: 1,
        height: 1,
      };

      const endBlock = blocks.find(block => (
        block.id !== tempPath.startBlockId
        && isBlockColliding(
          draggedPath,
          block,
          gridSize,
          false,
        )
      ));

      this.setState({
        ...this.state,
        tempPath: {
          ...tempPath,
          mouse: {
            x: roundToNearest(evt.clientX, gridSize),
            y: roundToNearest(evt.clientY, gridSize),
          },
          endBlockId: endBlock ? endBlock.id : '',
        },
      });
    } else {
      console.error(
        'No temp path.'
        + '\nThis is likely an async issue...'
        + '\nCurrent state:\n', this.state,
      );
    }
  };

  handlePathPlace = () => {
    const { tempPath, paths } = this.state;

    const canPlacePath = tempPath
      && tempPath.endBlockId
      && (tempPath.endBlockId !== tempPath.startBlockId)
      && !(paths.some(path => (
        path.startBlockId === tempPath.startBlockId
        && path.endBlockId === tempPath.endBlockId
      )));
    if (!canPlacePath) {
      console.warn('Can\'t place path here!');
    }

    if (canPlacePath) {
      this.setState({
        ...this.state,
        tempPath: null,
        paths: [
          ...paths,
          {
            ...tempPath,
            id: String(Math.ceil(Math.random() * 100000)),
            mouse: undefined,
          }
        ],
      })
    } else {
      this.setState({
        ...this.state,
        tempPath: null,
      })
    }

    // Remove listeners and reset coordinates.
    this.resetDrag();
  };

  handleMouseEnter = () => {
    this.setState({
      ...this.state,
      cursorOutsideWorkspace: false,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      ...this.state,
      cursorOutsideWorkspace: true,
    });
  };

  onBlockDelete = id => {
    const { blocks, paths } = this.state;

    // Find index of block to delete.
    const index = blocks.findIndex(blk => blk.id === id);

    // Find all paths that link to block and delete them from paths array.
    let pathIndexesToDelete = [];
    let trimmedPaths = paths.slice();
    trimmedPaths.forEach((path, index) => {
      if (path.startBlockId === id || path.endBlockId === id) {
        pathIndexesToDelete.push(index);
      }
    });
    pathIndexesToDelete.reverse();
    pathIndexesToDelete.forEach(indexToDelete => {
      trimmedPaths.splice(indexToDelete, 1);
    });

    this.setState({
      ...this.state,
      blocks: [
        ...blocks.slice(0, index),
        ...blocks.slice(index + 1),
      ],
      paths: trimmedPaths,
    })
  };

  onPathDelete = id => {
    console.log('on path delete: ', id);
  };

  resetDrag = () => {
    // Remove listeners.
    document.removeEventListener('mousemove', this.handleBlockDrag);
    document.removeEventListener('mouseup', this.handleBlockPlace);
    document.removeEventListener('mousemove', this.handlePathDrag);
    document.removeEventListener('mouseup', this.handlePathPlace);
    if (this.workspace) {
      this.workspace.removeEventListener('mouseleave', this.handleMouseLeave);
      this.workspace.removeEventListener('mouseenter', this.handleMouseEnter);
    }

    // Reset coordinates.
    this.originalMouseCoordinates = {};
    this.originalBlockCoordinates = {};
  };

  render() {
    const {
      width,
      height,
      blocks,
      paths,
      tempPath,
      selected,
      dragging,
      cursorOutsideWorkspace,
      isOverlapping,
    } = this.state;
    const { gridSize, workspaceClassName } = this.props;
    const isInvalid = cursorOutsideWorkspace || isOverlapping;
    return (
      <div
        className="WorkflowWorkspace"
        style={{
          width: width,
          height: height,
        }}
        onMouseDown={this.handleBlockMouseDown}
        ref={ref => this.workspace = ref}
      >
        <svg
          className={'WorkflowWorkspace__render'
          + (workspaceClassName ? ' ' + workspaceClassName : '')
          }
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="_subgrid"
              width={gridSize / 2}
              height={gridSize / 2}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize / 2} 0 L 0 0 0 ${gridSize / 2}`}
                fill="none"
                stroke="#EEE"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              id="_grid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <rect
                className="WorkflowWorkspace__grid"
                width="100%"
                height="100%"
                fill="url(#_subgrid)"
              />
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke="#EEE"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect
            className="WorkflowWorkspace__grid"
            width="100%"
            height="100%"
            fill="url(#_grid)"
          />
          {paths.map(path => {
            return (
              <Path
                key={path.id}
                onDelete={this.onPathDelete}
                startBlock={blocks.find(bl => bl.id === path.startBlockId)}
                endBlock={blocks.find(bl => bl.id === path.endBlockId)}
                {...path}
              />
            );
          })}
          {tempPath
            ? (
              <Path
                id="_tempPath"
                onDelete={this.onPathDelete}
                startBlock={blocks.find(bl => bl.id === tempPath.startBlockId)}
                endBlock={blocks.find(bl => bl.id === tempPath.endBlockId)}
                {...tempPath}
              />
            )
            : ''
          }
          {blocks.map(block => {
            const isSelected = selected === block.id;
            const isDragging = dragging === block.id;
            return (
              <Block
                key={block.id}
                {...block}
                isSelected={isSelected}
                isDragging={isDragging}
                isHighlighted={!!(tempPath && tempPath.endBlockId === block.id)}
                isInvalid={isInvalid && isDragging}
              />
            );
          })}
        </svg>
        <BlockOverlay
          selectedBlock={selected
            ? blocks.find(bl => bl.id === selected)
            : undefined
          }
          onDelete={this.onBlockDelete}
          onNewPath={this.handlePathMouseDown}
        />
      </div>
    );
  }
}

Workspace.propTypes = propTypes;
Workspace.defaultProps = defaultProps;

export { Workspace };
