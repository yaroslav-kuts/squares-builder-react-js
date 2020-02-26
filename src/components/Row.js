import React from 'react';

import Cell from './Cell';

const Row = (props) => {
    const cells = props.cells.map(({ y }) => <Cell key={y}/>);
    return (<tr>{cells}</tr>)
};

export default Row;
