import React from 'react';
import PropTypes from 'prop-types';
import { Workspace } from './Workspace/Workspace';
import { WorkflowShapes } from './Block/Shapes';

import './Workflow.scss';

const testingBlocks = [
  {
    id: 'block-1',
    title: 'Block 1',
    shape: WorkflowShapes.Rectangle,
    x: 160,
    y: 160,
  },
  {
    id: 'block-2',
    title: 'Block 2',
    shape: WorkflowShapes.Circle,
    x: 300,
    y: 300,
  },
  {
    id: 'block-3',
    title: 'Block 3',
    shape: WorkflowShapes.Rectangle,
    x: 460,
    y: 160,
  },
  {
    id: 'block-4',
    title: 'Block 4',
    shape: WorkflowShapes.Diamond,
    x: 600,
    y: 300,
  },
];

const testingPaths = [
  {
    id: 'given-path-1',
    title: 'Path 1',
    source: 'block-1',
    target: 'block-2',
    points: [
      // {
      //   x: 20,
      //   y: 20,
      // },
      // {
      //   x: 80,
      //   y: 20,
      // },
      // {
      //   x: 80,
      //   y: 20,
      // },
    ],
  }
];

const propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      shape: PropTypes.oneOf(
        Object.values(WorkflowShapes),
      ).isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ),
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
      points: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        }),
      ).isRequired,
      type: PropTypes.string.isRequired,
    }),
  ),
  gridSize: PropTypes.number,
  allowAdjacentBlocks: PropTypes.bool,
  workflowClassName: PropTypes.string,
  workspaceClassName: PropTypes.string,
};

const defaultProps = {
  blocks: testingBlocks,
  paths: testingPaths,
  gridSize: 20,
  allowAdjacentBlocks: false,
  workflowClassName: '',
  workspaceClassName: '',
};

function Workflow(props) {
  return (
    <div
      className={'Workflow'
      + (props.workflowClassName ? ' ' + props.workflowClassName : '')
      }
    >
      <Workspace {...props} />
    </div>
  );
}

Workflow.propTypes = propTypes;
Workflow.defaultProps = defaultProps;

export { Workflow };
