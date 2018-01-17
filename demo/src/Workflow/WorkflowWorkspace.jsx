import React, { PureComponent } from 'react';
import { WorkflowNode } from './WorkflowNode';
import './WorkflowWorkspace.css';

const propTypes = {
}

const defualtProps = {
}

class WorkflowWorkspace extends PureComponent {
  constructor() {
    super();

    this.state = {
      selected: '',
    }
  }

  clearSelection = () => {
    this.setState({
      selected: '',
    })
  }

  setSelection = id => {
    this.setState({
      selected: id,
    })
  }

  handleMouseDown = evt => {
    this.clearSelection();
  }

  render() {
    const { selected } = this.state;
    return (
      <svg
        className="WorkflowWorkspace"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <WorkflowNode
          title="Title 1"
          id="1"
          isSelected={selected === '1'}
          setSelection={this.setSelection}
          clearSelection={this.clearSelection}
          x={150}
          y={150}
        />
        <WorkflowNode
          title="Title 2"
          id="2"
          isSelected={selected === '2'}
          setSelection={this.setSelection}
          clearSelection={this.clearSelection}
          x={300}
          y={300}
        />
        <WorkflowNode
          title="Title 3"
          id="3"
          isSelected={selected === '3'}
          setSelection={this.setSelection}
          clearSelection={this.clearSelection}
          x={450}
          y={150}
        />
        <WorkflowNode
          title="Title 4"
          id="4"
          isSelected={selected === '4'}
          setSelection={this.setSelection}
          clearSelection={this.clearSelection}
          x={600}
          y={300}
        />
      </svg>
    )
  }
}


WorkflowWorkspace.propTypes = propTypes;
WorkflowWorkspace.defualtProps = defualtProps;

export { WorkflowWorkspace };