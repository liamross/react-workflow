import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OverlayButton } from './OverlayButton';

import './BlockOverlay.scss';

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

const defaultProps = {
  selectedBlock: null,
};

class BlockOverlay extends PureComponent {
  handleDelete = evt => {
    evt.stopPropagation();
    console.log('Delete node')
  };

  handleNewPath = evt => {
    evt.stopPropagation();
    console.log('New path')
  };

  render() {
    const { selectedBlock } = this.props;
    const SPACE_AROUND_BLOCK = 3;
    const style = selectedBlock
      ? {
        left: selectedBlock.x - SPACE_AROUND_BLOCK,
        top: selectedBlock.y - SPACE_AROUND_BLOCK,
        width: selectedBlock.width + SPACE_AROUND_BLOCK * 2,
        height: selectedBlock.height + SPACE_AROUND_BLOCK * 2,
      }
      : {};

    return selectedBlock
      ? (
        <div className="BlockOverlay" style={style}>
          <OverlayButton
            title="Delete block"
            icon="×"
            onMouseDown={this.handleDelete}
            className="BlockOverlay__button BlockOverlay__button--NE"
          />
          <OverlayButton
            title="Drag to create new path"
            icon="~"
            onMouseDown={this.handleNewPath}
            className="BlockOverlay__button BlockOverlay__button--SW"
          />
        </div>
      )
      : null;
  }
}

BlockOverlay.propTypes = propTypes;
BlockOverlay.defaultProps = defaultProps;
export { BlockOverlay };
