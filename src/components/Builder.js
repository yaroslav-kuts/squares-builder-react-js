import React from 'react';
import PropTypes from 'prop-types';

import Row from './Row';
import Button from './Button';

const DEFAULT_PADDING = 41;

class Builder extends React.Component {
  constructor(props) {
    super(props);

    const matrix = [...Array(+props.initialHeight)]
      .map((v, rowIndex) => [...Array(+props.initialWidth)]
        .map((_v, cellIndex) => ({ rowIndex, cellIndex })));

    this.state = {
      matrix,
      rowIndex: -1,
      cellIndex: -1,
      offsetLeft: 0,
      offsetTop: 0,
      isRemoveRowBtnVisible: false,
      isRemoveColBtnVisible: false,
    };
  }

    handleAddColButtonClick = () => {
      this.setState(({ matrix }) => {
        const { cellIndex } = matrix[0][matrix[0].length - 1];
        return {
          matrix: matrix.map((row, rowIndex) => [...row, {
            rowIndex, cellIndex: cellIndex + 1,
          }]),
        };
      });
    }

    handleAddRowButtonClick = () => {
      this.setState(({ matrix }) => {
        const { rowIndex } = matrix[matrix.length - 1][0];
        const row = [...Array(matrix[0].length)].map((v, cellIndex) => ({
          rowIndex: rowIndex + 1, cellIndex,
        }));
        return { matrix: [...matrix, row] };
      });
    }

    handleRemoveRowButtonClick = () => {
      this.setState(({ matrix, rowIndex }) => ({
        isRemoveRowBtnVisible: false,
        isRemoveColBtnVisible: false,
        matrix: matrix.filter((v, i) => i !== rowIndex),
      }));
    }

    handleRemoveColButtonClick = () => {
      this.setState(({ matrix, cellIndex }) => ({
        isRemoveRowBtnVisible: false,
        isRemoveColBtnVisible: false,
        matrix: matrix.map((row) => row.filter((v, i) => i !== cellIndex)),
      }));
    }

    handleMouseOver = ({
      target,
      target: {
        parentNode: { rowIndex },
        cellIndex,
        offsetLeft,
        offsetTop,
      },
    }) => {
      if (!(target instanceof HTMLTableCellElement)) return;

      this.setState(({ matrix }) => ({
        rowIndex,
        cellIndex,
        offsetLeft: DEFAULT_PADDING + offsetLeft,
        offsetTop: DEFAULT_PADDING + offsetTop,
        isRemoveRowBtnVisible: matrix.length > 1,
        isRemoveColBtnVisible: matrix[0].length > 1,
      }));
    }

    handleMouseLeave = ({ relatedTarget: { classList } }) => {
      if (classList && classList.contains('remove')) return;
      this.setState(({
        isRemoveRowBtnVisible: false,
        isRemoveColBtnVisible: false,
      }));
    }

    render() {
      const {
        matrix,
        offsetTop,
        offsetLeft,
        isRemoveColBtnVisible,
        isRemoveRowBtnVisible,
      } = this.state;

      return (
        <div className="main">
          <div className="table" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
            <table>
              <tbody>
                {matrix.map((cells) => <Row cells={cells} key={cells[0].rowIndex} />)}
              </tbody>
            </table>
          </div>

          <Button
            side="bottom"
            action="add"
            onClick={this.handleAddRowButtonClick}
          />
          <Button
            side="right"
            action="add"
            onClick={this.handleAddColButtonClick}
          />

          {isRemoveRowBtnVisible && (
          <Button
            side="top"
            action="remove"
            offset={offsetTop}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleRemoveRowButtonClick}
          />
          )}
          {isRemoveColBtnVisible && (
          <Button
            side="left"
            action="remove"
            offset={offsetLeft}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleRemoveColButtonClick}
          />
          )}
        </div>
      );
    }
}

Builder.defaultProps = {
  initialWidth: 4,
  initialHeight: 4,
  cellSize: 40,
};

Builder.propTypes = {
  initialWidth: PropTypes.number,
  initialHeight: PropTypes.number,
  cellSize: PropTypes.number,
};

export default Builder;
