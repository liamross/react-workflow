import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { WorkflowWorkspace } from './Workflow/WorkflowWorkspace';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WorkflowWorkspace />, document.getElementById('root'));
registerServiceWorker();
