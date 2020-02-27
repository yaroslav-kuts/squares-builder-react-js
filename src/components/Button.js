import React from 'react';

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

export default Button;
