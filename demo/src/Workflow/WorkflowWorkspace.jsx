import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WorkflowBlock } from './WorkflowBlock';
import { isBlockColliding, roundToNearest } from './workflowUtils';

import './WorkflowWorkspace.scss';

const propTypes = {
  onChange: PropTypes.func,
  gridSize: PropTypes.number,
  allowAdjacentBlocks: PropTypes.bool,
};

const defaultProps = {
  onChange: null,
  gridSize: 20,
  allowAdjacentBlocks: false,
};

const testingBlocks = [
  {
    title: 'Title 1',
    id: '1',
    x: 150,
    y: 150,
    width: 120,
    height: 80,
  },
  {
    title: 'Title 2',
    id: '2',
    x: 300,
    y: 300,
    width: 120,
    height: 80,
  },
  {
    title: 'Title 3',
    id: '3',
    x: 450,
    y: 150,
    width: 120,
    height: 80,
  },
  {
    title: 'Title 4',
    id: '4',
    x: 600,
    y: 300,
    width: 120,
    height: 80,
  },
];

class WorkflowWorkspace extends PureComponent {
  constructor() {
    super();

    this.state = {
      blocks: testingBlocks,
      selected: '',
      dragging: '',
      cursorOutsideWorkspace: false,
      isOverlapping: false,
    };
    // Reference to svg workspace.
    this.workspace = null;

    // Keeps track of previous coordinates and original coordinates.
    this.originalMouseCoordinates = {}; // {x: number, y: number}
    this.originalBlockCoordinates = {}; // {x: number, y: number}
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
      // Begin dragging if draggable.
      const targetId = target.getAttribute('id');
      this.setState({
        ...this.state,
        dragging: targetId,
      });

      // Store original mouse coordinates.
      this.originalMouseCoordinates.x = evt.clientX;
      this.originalMouseCoordinates.y = evt.clientY;

      // Store original block coordinates (to nearest grid).
      const currentBlock = blocks.find(block => block.id === targetId);
      this.originalBlockCoordinates.x = roundToNearest(
        currentBlock.x,
        gridSize,
      );
      this.originalBlockCoordinates.y = roundToNearest(
        currentBlock.y,
        gridSize,
      );

      // Listen for movement and leaving the workspace.
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      if (this.workspace) {
        this.workspace.addEventListener('mouseleave', this.handleMouseLeave);
        this.workspace.addEventListener('mouseenter', this.handleMouseEnter);
      }
    } else {
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
      const currentBlockIndex = blocks.findIndex(blk => blk.id === dragging);
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
      console.error('Drag not registered...\nState:\n', this.state);
    }
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

  handleMouseUp = () => {
    const { blocks, dragging, cursorOutsideWorkspace, isOverlapping } = this.state;
    const isInvalid = cursorOutsideWorkspace || isOverlapping;

    // If invalid, move back to original coordinates.
    if (isInvalid && dragging) {
      this.setState({
        ...this.state,
        blocks: blocks.map(block => block.id === dragging
          ? {
            ...block,
            x: this.originalBlockCoordinates.x,
            y: this.originalBlockCoordinates.y,
          }
          : block,
        ),
        cursorOutsideWorkspace: false,
        isOverlapping: false,
      });
    }

    this.setState({
      selection: dragging,
      dragging: ''
    });

    // Remove listeners and reset coordinates.
    this.removeListeners();
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
    const { gridSize } = this.props;
    const { blocks, selected, dragging, cursorOutsideWorkspace, isOverlapping } = this.state;
    const isInvalid = cursorOutsideWorkspace || isOverlapping;
    return (
      <svg
        className="WorkflowWorkspace"
        onMouseDown={this.handleMouseDown}
        ref={ref => this.workspace = ref}
      >
        {blocks.map(block => {
          const isSelected = selected === block.id;
          const isDragging = dragging === block.id;
          return (
            <WorkflowBlock
              key={block.id}
              {...block}
              gridSize={gridSize}
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

WorkflowWorkspace.propTypes = propTypes;
WorkflowWorkspace.defaultProps = defaultProps;

export { WorkflowWorkspace };