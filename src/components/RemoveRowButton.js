import React from 'react';

const RemoveRowButton = (props) => {
    return (
        <div
            className="remove left button"
            style={{ top: `${props.offsetTop}px` }}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
        >
            -
        </div>
    );
}

export default RemoveRowButton;
