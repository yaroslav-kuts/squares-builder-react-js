import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

const Row = ({ cells }) => (<tr>{cells.map(({ cellIndex }) => <Cell key={cellIndex} />)}</tr>);

Row.defaultProps = { cells: [{ rowIndex: 0, cellIndex: 0 }] };

Row.propTypes = {
  cells: PropTypes.arrayOf((cells, key, component, location, propName) => {
    const errorText = `${component} has received invalid prop: ${propName}`;
    const { rowIndex, cellIndex } = cells[key];
    if (rowIndex < 0 || cellIndex < 0) return new Error(errorText);
  }),
};

export default Row;
