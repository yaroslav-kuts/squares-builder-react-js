import React from 'react';

import Row from './Row';
import AddRowButton from './AddRowButton';
import AddColButton from './AddColButton';
import RemoveColButton from './RemoveColButton';
import RemoveRowButton from './RemoveRowButton';

const DEFAULT_PADDING = 41;

class Builder extends React.Component {
    constructor(props) {
        super(props);

        const matrix = [...Array(+props.initialHeight)].map((v, rowIndex) => {
            return [...Array(+props.initialWidth)].map((v, cellIndex) => ({ rowIndex, cellIndex }))
        });

        this.state = {
            matrix,
            rowIndex: -1,
            cellIndex: -1,
            offsetLeft: DEFAULT_PADDING,
            offsetTop: DEFAULT_PADDING,
            isRemoveRowBtnVisible: false,
            isRemoveColBtnVisible: false,
        };
    }

    handleAddColButtonClick = () => {
        this.setState(({ matrix }) => {
            const { cellIndex } = matrix[0][matrix[0].length - 1];
            return { matrix: matrix.map((row, rowIndex) => [...row, {
                rowIndex, cellIndex: cellIndex + 1
            }]) };
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
            matrix: matrix.map(row => {
                return row.filter((v, i) => i !== cellIndex);
            }),
        }));
    }

    handleMouseOver = ({
            target,
            target: {
                parentNode: { rowIndex },
                cellIndex,
                offsetLeft,
                offsetTop
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
            <div className="main" >
                <div className="table" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                    <table>
                        <tbody>
                            {matrix.map(cells => <Row cells={cells} key={cells[0].rowIndex}/>)}
                        </tbody>
                    </table>
                </div>

                <AddRowButton onClick={this.handleAddRowButtonClick} />
                <AddColButton onClick={this.handleAddColButtonClick} />

                {isRemoveRowBtnVisible && <RemoveRowButton
                    offsetTop={offsetTop}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.handleRemoveRowButtonClick}
                />}
                {isRemoveColBtnVisible && <RemoveColButton
                    offsetLeft={offsetLeft}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.handleRemoveColButtonClick}
                />}
            </div>
        )
    }
}

export default Builder;
