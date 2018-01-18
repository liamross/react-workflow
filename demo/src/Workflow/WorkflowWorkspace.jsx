import React, { PureComponent } from 'react';
import { WorkflowBlock } from './WorkflowBlock';
import './WorkflowWorkspace.scss';
import { isBlockColliding } from './workflowUtils';

const propTypes = {};

const defaultProps = {};

const testingBlocks = [
  {
    title: 'Title 1',
    id: '1',
    key: '1',
    x: 150,
    y: 150,
    width: 120,
    height: 80,
  },
  {
    title: 'Title 2',
    id: '2',
    key: '2',
    x: 300,
    y: 300,
    width: 120,
    height: 80,
  },
  {
    title: 'Title 3',
    id: '3',
    key: '3',
    x: 450,
    y: 150,
    width: 120,
    height: 80,
  },
  {
    title: 'Title 4',
    id: '4',
    key: '4',
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
    this.coordinates = {};          // {x: number, y: number}
    this.originalCoordinates = {};  // {x: number, y: number}
  }

  setSelection = (selected = '') => {
    this.setState({
      ...this.state,
      selected,
    });
  };

  setDragging = (dragging = '') => {
    this.setState({
      ...this.state,
      dragging,
    });
  };

  handleMouseDown = evt => {
    const { blocks } = this.state;
    const target = evt.target.parentElement;
    const targetClass = target.getAttribute('class');
    this.setSelection();

    if (targetClass && targetClass.includes('_draggable')) {
      // Begin dragging if draggable.
      const targetId = target.getAttribute('id');
      // TODO: Hack to stop overlapping this.SetState. Fix this.
      setTimeout(() => this.setDragging(targetId));

      // Initialize coordinates based off of mouse.
      this.coordinates.x = evt.clientX;
      this.coordinates.y = evt.clientY;

      // Store original coordinates in case of move error.
      const currentBlock = blocks.find(block => block.id === targetId);
      this.originalCoordinates.x = currentBlock.x;
      this.originalCoordinates.y = currentBlock.y;

      // Listen for movement and leaving the workspace.
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      if (this.workspace) {
        this.workspace.addEventListener('mouseleave', this.handleMouseLeave);
        this.workspace.addEventListener('mouseenter', this.handleMouseEnter);
      }
    }
  };

  handleMouseMove = evt => {
    const { blocks, dragging } = this.state;

    // Find deltas.
    const dx = this.coordinates.x - evt.clientX;
    const dy = this.coordinates.y - evt.clientY;

    // Update the coordinates.
    this.coordinates.x = evt.clientX;
    this.coordinates.y = evt.clientY;

    // Check if dragged block is overlapping.
    const currentBlockIndex = blocks.findIndex(block => block.id === dragging);
    const isOverlapping = blocks.some((block, index) => (
      index !== currentBlockIndex
      && isBlockColliding(blocks[currentBlockIndex], block)
    ));

    this.setState({
      ...this.state,
      blocks: [
        ...blocks.slice(0, currentBlockIndex),
        {
          ...blocks[currentBlockIndex],
          x: blocks[currentBlockIndex].x - dx,
          y: blocks[currentBlockIndex].y - dy,
        },
        ...blocks.slice(currentBlockIndex + 1),
      ],
      isOverlapping,
    });
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
    this.onComplete();
  };

  onComplete = () => {
    const { blocks, dragging, cursorOutsideWorkspace, isOverlapping } = this.state;
    const isInvalid = cursorOutsideWorkspace || isOverlapping;

    // If invalid, move back to original coordinates.
    if (isInvalid && dragging) {
      this.setState({
        ...this.state,
        blocks: blocks.map(block => block.id === dragging
          ? {
            ...block,
            x: this.originalCoordinates.x,
            y: this.originalCoordinates.y,
          }
          : block,
        ),
        cursorOutsideWorkspace: false,
        isOverlapping: false,
      });
    }

    // Set selection as previously dragged block, remove dragging.
    // TODO: Hack to stop overlapping this.SetState. Fix this.
    setTimeout(() => this.setSelection(dragging));
    // TODO: Hack to stop overlapping this.SetState. Fix this.
    setTimeout(() => this.setDragging());

    // Remove listeners and reset this.coordinates.
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    if (this.workspace) {
      this.workspace.removeEventListener('mouseleave', this.handleMouseLeave);
      this.workspace.removeEventListener('mouseenter', this.handleMouseEnter);
    }

    // Reset coordinates.
    this.coordinates = {};
    this.originalCoordinates = {};
  };

  render() {
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
              {...block}
              isSelected={isSelected}
              isDragging={isDragging}
              isInvalid={isInvalid && isDragging}
            />
          )
        })}
      </svg>
    );
  }
}


WorkflowWorkspace.propTypes = propTypes;
WorkflowWorkspace.defaultProps = defaultProps;

export { WorkflowWorkspace };