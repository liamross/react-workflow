import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OverlayButton } from './OverlayButton';
import { ShapeParameters } from '../Block/Shapes';

import './BlockOverlay.scss';

const propTypes = {
  selectedBlock: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onDelete: PropTypes.func.isRequired,
  onNewPath: PropTypes.func.isRequired,
  // onCreatePath: PropTypes.func.isRequired,
  // onWidthChange: PropTypes.func.isRequired,
};

const defaultProps = {
  selectedBlock: null,
};

class BlockOverlay extends PureComponent {
  handleDelete = evt => {
    const { onDelete, selectedBlock } = this.props;
    evt.stopPropagation();
    onDelete(selectedBlock.id);
  };

  handleNewPath = evt => {
    const { onNewPath, selectedBlock } = this.props;
    evt.stopPropagation();
    onNewPath(evt, selectedBlock.id);
  };

  render() {
    const { selectedBlock } = this.props;
    const { width, height } = selectedBlock
      ? ShapeParameters[selectedBlock.shape]
      : { width: null, height: null, };
    const SPACE_AROUND_BLOCK = 3;
    const style = selectedBlock
      ? {
        left: selectedBlock.x - SPACE_AROUND_BLOCK,
        top: selectedBlock.y - SPACE_AROUND_BLOCK,
        width: width + SPACE_AROUND_BLOCK * 2,
        height: height + SPACE_AROUND_BLOCK * 2,
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
