import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Block } from '../Block/Block';
import {
  isBlockColliding, roundToNearest, setIdToTop,
} from '../Utilities/workflowUtils';

import './Workspace.scss';

// TODO: add some form of submission.
const propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
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
  gridSize: PropTypes.number.isRequired,
  allowAdjacentBlocks: PropTypes.bool.isRequired,
  workspaceClassName: PropTypes.string.isRequired,
};

const defaultProps = {};

class Workspace extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      blocks: props.blocks,
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
    });
  }

  componentWillUnmount() {
    // Remove listeners if component unmounts mid-move.
    this.removeListeners();
  }

  handleMouseDown = evt => {
    const { gridSize } = this.props;
    const { blocks } = this.state;
    const target = evt.target.parentElement;
    const targetClass = target.getAttribute('class');

    if (targetClass && targetClass.includes('_draggable')) {
      // If click is on draggable component, begin dragging, remove selection,
      // and set dragged block to top (bottom of blocks array).
      const targetId = target.getAttribute('id');
      const newBlocks = setIdToTop(targetId, blocks);
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
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
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

  handleMouseMove = evt => {
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
      const newBlock = {
        ...blocks[currentBlockIndex],
        x: blockX,
        y: blockY,
      };
      const isOverlapping = blocks.some((block, index) => (
        index !== currentBlockIndex
        && isBlockColliding(
          newBlock,
          block,
          gridSize,
          allowAdjacentBlocks,
        )
      ));

      this.setState({
        ...this.state,
        blocks: [
          ...blocks.slice(0, currentBlockIndex),
          newBlock,
          ...blocks.slice(currentBlockIndex + 1),
        ],
        isOverlapping,
      });
    } else {
      // Remove listeners and reset coordinates.
      console.error(
        'Not in dragging state.'
        + '\nThis is likely an async issue...'
        + '\nCurrent state:\n', this.state,
      );
    }
  };

  handleMouseUp = () => {
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
    this.removeListeners();
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

  removeListeners = () => {
    // Remove listeners.
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
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
      blocks,
      selected,
      dragging,
      cursorOutsideWorkspace,
      isOverlapping,
    } = this.state;
    const { width, height, workspaceClassName } = this.props;
    const isInvalid = cursorOutsideWorkspace || isOverlapping;
    return (
      <svg
        className={'WorkflowWorkspace'
        + (workspaceClassName ? ' ' + workspaceClassName : '')
        }
        width={width}
        height={height}
        onMouseDown={this.handleMouseDown}
        ref={ref => this.workspace = ref}
      >
        <rect
          className="WorkflowWorkspace__fill"
          x={0}
          y={0}
          width={width}
          height={height}
        />
        {blocks.map(block => {
          const isSelected = selected === block.id;
          const isDragging = dragging === block.id;
          return (
            <Block
              key={block.id}
              {...block}
              isSelected={isSelected}
              isDragging={isDragging}
              isInvalid={isInvalid && isDragging}
            />
          );
        })}
      </svg>
    );
  }
}

Workspace.propTypes = propTypes;
Workspace.defaultProps = defaultProps;

export { Workspace };
