import React from 'react';

import Cell from './Cell';

const Row = (props) => {
    const cells = props.cells.map(({ cellIndex }) => <Cell key={cellIndex}/>);
    return (<tr>{cells}</tr>)
};

export default Row;
