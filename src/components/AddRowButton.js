import React from 'react';

const AddRowButton = (props) => {
    return (
        <div className="add bottom button" onClick={props.onClick}>
            +
        </div>
    );
}

export default AddRowButton;
