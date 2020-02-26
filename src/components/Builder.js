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

        const matrix = [...Array(+props.initialHeight)].map((v, x) => {
            return [...Array(+props.initialWidth)].map((v, y) => ({ x, y }))
        });

        this.state = {
            matrix,
            x: -1,
            y: -1,
            offsetLeft: DEFAULT_PADDING,
            offsetTop: DEFAULT_PADDING,
            isRemoveRowBtnVisible: false,
            isRemoveColBtnVisible: false,
        };

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.handleAddRowButtonClick = this.handleAddRowButtonClick.bind(this);
        this.handleAddColButtonClick = this.handleAddColButtonClick.bind(this);

        this.handleRemoveRowButtonClick = this.handleRemoveRowButtonClick.bind(this);
        this.handleRemoveColButtonClick = this.handleRemoveColButtonClick.bind(this);
    }

    handleAddColButtonClick() {
        const width = this.state.matrix[0].length;

        const matrix = this.state.matrix.map((row, x) => [...row, { x, y: width }])

        this.setState(prev => ({ ...prev, matrix }));
    }

    handleAddRowButtonClick() {
        const height = this.state.matrix.length;
        const width = this.state.matrix[0].length;

        const row = [...Array(width)].map((v, y) => ({ x: height, y }));
        const matrix = [...this.state.matrix, row];

        this.setState(prev => ({ ...prev, matrix }));
    }

    handleRemoveRowButtonClick() {
        this.setState(prev => ({
            ...prev,
            isRemoveRowBtnVisible: false,
            isRemoveColBtnVisible: false,
            matrix: this.state.matrix.filter((v, i) => i !== this.state.x),
        }));
    }

    handleRemoveColButtonClick() {
        const matrix = this.state.matrix.map(row => {
            return row.filter((v, i) => i !== this.state.y);
        });
        this.setState(prev => ({
            ...prev,
            isRemoveRowBtnVisible: false,
            isRemoveColBtnVisible: false,
            matrix
        }))
    }

    handleMouseOver(event) {
        if (!(event.target instanceof HTMLTableCellElement)) return;

        const x = event.target.parentNode.rowIndex;
        const y = event.target.cellIndex;

        const offsetLeft = DEFAULT_PADDING + event.target.offsetLeft;
        const offsetTop = DEFAULT_PADDING + event.target.offsetTop;

        this.setState(prev => ({
            ...prev,
            x,
            y,
            offsetLeft,
            offsetTop,
            isRemoveRowBtnVisible: this.state.matrix.length > 1,
            isRemoveColBtnVisible: this.state.matrix[0].length > 1,
        }));
    }

    handleMouseLeave(event) {
        const classList = event.relatedTarget.classList;
        if (classList && classList.contains('remove')) return;
        this.setState(prev => ({
            ...prev,
            isRemoveRowBtnVisible: false,
            isRemoveColBtnVisible: false,
        }));
    }

    render() {
        const rows = this.state.matrix.map(cells => <Row cells={cells} key={cells[0].x}/>);

        return (
            <div className="main" >
                <div className="table" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                    <table>
                        <tbody>{rows}</tbody>
                    </table>
                </div>

                <AddRowButton onClick={this.handleAddRowButtonClick} />
                <AddColButton onClick={this.handleAddColButtonClick} />

                {this.state.isRemoveRowBtnVisible && <RemoveRowButton offsetTop={this.state.offsetTop} onMouseLeave={this.handleMouseLeave} onClick={this.handleRemoveRowButtonClick} />}
                {this.state.isRemoveColBtnVisible && <RemoveColButton offsetLeft={this.state.offsetLeft} onMouseLeave={this.handleMouseLeave} onClick={this.handleRemoveColButtonClick} />}
            </div>
        )
    }
}

export default Builder;