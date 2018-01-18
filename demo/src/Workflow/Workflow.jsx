import React from 'react';
import PropTypes from 'prop-types';
import { Workspace } from './Workspace';

import './Workflow.scss';

const testingBlocks = [
  {
    title: 'Title 1',
    id: '1',
    x: 160,
    y: 160,
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
    x: 460,
    y: 160,
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

const propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
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
  gridSize: PropTypes.number,
  allowAdjacentBlocks: PropTypes.bool,
  workflowClassName: PropTypes.string,
  workspaceClassName: PropTypes.string,
};

const defaultProps = {
  width: '100%',
  height: '100%',
  blocks: testingBlocks,
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
