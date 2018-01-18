import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './WorkflowNode.css';

const propTypes = {
  //
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setSelection: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  //
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

const defaultProps = {
  width: 150,
  height: 80,
  className: '',
};

class WorkflowNode extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      x: this.props.x,
      y: this.props.y,
    };
  }

  handleMouseDown = evt => {
    const { clearSelection } = this.props;
    evt.stopPropagation();
    clearSelection();

    this.coords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    document.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUp = () => {
    const { setSelection, id } = this.props;
    setSelection(id);

    document.removeEventListener('mousemove', this.handleMouseMove);
    this.coords = {};
  };

  handleMouseMove = (e) => {
    const xDiff = this.coords.x - e.clientX;
    const yDiff = this.coords.y - e.clientY;

    this.coords.x = e.clientX;
    this.coords.y = e.clientY;

    this.setState({
      x: this.state.x - xDiff,
      y: this.state.y - yDiff,
    });
  };

  render() {
    const { title, isSelected, width, height, className } = this.props;
    const { x, y } = this.state;
    const fontX = x + (
      width / 2
    );
    const fontY = y + (
      height / 2
    ) + 7;
    return (
      <g
        className={`WorkflowNode${
        (
          isSelected ? ' WorkflowNode--selected' : ''
        )
        + (
          className ? ' ' + className : ''
        )
          }`
        }
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <rect
          className="WorkflowNode__background"
          width={width}
          height={height}
          x={x}
          y={y}
        />
        <text
          className="WorkflowNode__text"
          x={fontX}
          y={fontY}
          textAnchor="middle"
          fontSize="14"
        >
          {title}
        </text>
      </g>
    );
  }
}

WorkflowNode.propTypes = propTypes;
WorkflowNode.defaultProps = defaultProps;

export { WorkflowNode };