import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_SHIFT = 3;

const signs = { add: '+', remove: '-' };

const Button = ({
  action, side, offset, cellSize, onMouseLeave, onClick,
}) => (
  <div
    className={`${action} ${side} button`}
    style={{
      [side]: offset,
      width: cellSize,
      height: cellSize,
      ...(action === 'add' && side === 'bottom' ? { left: cellSize + DEFAULT_SHIFT } : {}),
      ...(action === 'add' && side === 'right' ? { top: cellSize + DEFAULT_SHIFT } : {}),
    }}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {signs[action]}
  </div>
);

Button.defaultProps = {
  action: 'add',
  side: 'top',
  offset: 0,
  cellSize: 50,
  onMouseLeave: () => {},
  onClick: () => {},
};

Button.propTypes = {
  action: PropTypes.oneOf(['add', 'remove']),
  side: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  offset: PropTypes.number,
  cellSize: PropTypes.number,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
};

export default Button;
