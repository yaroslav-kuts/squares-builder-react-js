import React from 'react';
import PropTypes from 'prop-types';

const signs = { add: '+', remove: '-' };

const Button = ({
        action, side, offset, onMouseLeave, onClick,
    }) => {
    return (
        <div
            className={`${action} ${side} button`}
            style={{ [side]: offset && `${offset}px` }}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {signs[action]}
        </div>
    );
}

Button.propTypes = {
    action: PropTypes.oneOf(['add', 'remove']),
    side: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    offset: PropTypes.number,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default Button;
