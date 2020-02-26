import React from 'react';

const RemoveColButton = (props) => {
    return (
        <div
            className="remove top button"
            style={{ left: `${props.offsetLeft}px` }}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
        >
            -
        </div>
    );
}

export default RemoveColButton;
