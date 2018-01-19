import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

function OverlayButton({ title, icon, onMouseDown, className }) {
  return (
    <div
      onMouseDown={onMouseDown}
      title={title}
      className={`OverlayButton ${className}`}
    >
      <div className="OverlayButton__icon">{icon}</div>
    </div>
  );
}

OverlayButton.propTypes = propTypes;
OverlayButton.defaultProps = defaultProps;
export { OverlayButton };
