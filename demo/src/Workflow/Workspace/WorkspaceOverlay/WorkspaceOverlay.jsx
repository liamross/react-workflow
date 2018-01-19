import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './WorkspaceOverlay.scss';

const propTypes = {
  selectedBlock: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  // onCreatePath: PropTypes.func.isRequired,
  // onWidthChange: PropTypes.func.isRequired,
};

const defaultProps = {};

class WorkspaceOverlay extends PureComponent {
  constructor() {
    super();

    this.state = {

      isOverlayOpen: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedBlock } = this.props;
    this.setState({
      ...this.state,

    });
  }

  render() {
    return (
      <div className="WorkspaceOverlay">
        {

        }
      </div>
    );
  }
}

WorkspaceOverlay.propTypes = propTypes;
WorkspaceOverlay.defaultProps = defaultProps;
export { WorkspaceOverlay };
