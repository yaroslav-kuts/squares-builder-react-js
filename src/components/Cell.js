import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ cellSize }) => (<td style={{ width: cellSize, height: cellSize }} />);

Cell.defaultProps = { cellSize: 50 };

Cell.propTypes = { cellSize: PropTypes.number };

export default Cell;
