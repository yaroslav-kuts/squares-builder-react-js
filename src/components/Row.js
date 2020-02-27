import React from 'react';

import Cell from './Cell';

const Row = ({ cells }) => {
    return (<tr>{cells.map(({ cellIndex }) => <Cell key={cellIndex}/>)}</tr>)
};

export default Row;
