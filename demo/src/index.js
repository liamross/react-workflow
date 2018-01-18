import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Workspace } from './Workflow/Workspace';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Workspace />, document.getElementById('root'));
registerServiceWorker();
