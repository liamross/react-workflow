import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Workflow from './Workflow';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Workflow
    workflowClassName="test-workflow"
    workspaceClassName="test-workspace"
  />,
  document.getElementById('root'),
);
registerServiceWorker();
