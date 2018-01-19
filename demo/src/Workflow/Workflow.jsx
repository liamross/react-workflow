import React from 'react';
import PropTypes from 'prop-types';
import { Workspace } from './Workspace/Workspace';
import { WorkflowShapes } from './Block/Shapes';

import './Workflow.scss';

const testingBlocks = [
  {
    title: 'Block 1',
    id: 'block-1',
    shape: WorkflowShapes.Rectangle,
    x: 160,
    y: 160,
    width: 120,
    height: 80,
  },
  {
    title: 'Block 2',
    id: 'block-2',
    shape: WorkflowShapes.Circle,
    x: 300,
    y: 300,
    width: 80,
    height: 80,
  },
  {
    title: 'Block 3',
    id: 'block-3',
    shape: WorkflowShapes.Rectangle,
    x: 460,
    y: 160,
    width: 120,
    height: 80,
  },
  {
    title: 'Block 4',
    id: 'block-4',
    shape: WorkflowShapes.Diamond,
    x: 600,
    y: 300,
    width: 120,
    height: 80,
  },
];

const testingPaths = [
  {
    title: 'Path 1',
    id: 'path-1',
    startBlockId: 'block-1',
    endBlockId: 'block-2',
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
      title: PropTypes.string,
      id: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  ),
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      startBlockId: PropTypes.string,
      endBlockId: PropTypes.string,
      points: PropTypes.arrayOf(
        PropTypes.arrayOf({
          x: PropTypes.number,
          y: PropTypes.number,
        }),
      ),
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
      id="_workflow"
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
