import React from 'react';

const DEFAULT_PADDING = 41;

const Cell = () => (<td></td>);

const Row = (props) => {
    const cells = props.cells.map(({ y }) => <Cell key={y}/>);
    return (<tr>{cells}</tr>)
};

const AddColBtn = (props) => {
    return (
        <div className="add right button" onClick={props.onClick} >
            +
        </div>
    );
}

const AddRowBtn = (props) => {
    return (
        <div className="add bottom button" onClick={props.onClick} >
            +
        </div>
    );
}

const RemoveColBtn = (props) => {
    return (
        <div
            className="remove top button"
            style={{ left: `${props.offsetLeft}px` }}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
        >
            -
        </div>
    );
}

const RemoveRowBtn = (props) => {
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

class SquaresBuilder extends React.Component {
    table;

    constructor(props) {
        super(props);

        const matrix = [...Array(+props.initialHeight)].map((v, x) => {
            return [...Array(+props.initialWidth)].map((v, y) => ({ x, y }))
        });

        this.state = {
            x: -1,
            y: -1,
            matrix,
            offsetLeft: DEFAULT_PADDING,
            offsetTop: DEFAULT_PADDING,
            isRemoveBtnsVisible: false,
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
            matrix: this.state.matrix.filter((v, i) => i !== this.state.x),
        }));
    }

    handleRemoveColButtonClick() {
        const matrix = this.state.matrix.map(row => {
            return row.filter((v, i) => i !== this.state.y);
        });
        this.setState(prev => ({ ...prev, matrix }))
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
            isRemoveBtnsVisible: true,
        }));
    }

    handleMouseLeave(event) {
        const classList = event.relatedTarget.classList;
        if (classList && classList.contains('remove')) return;
        this.setState(prev => ({ ...prev, isRemoveBtnsVisible: false }));
    }

    render() {
        const rows = this.state.matrix.map(cells => <Row cells={cells} key={cells[0].x}/>);

        return (
            <div className="main" >
                <div className="table"
                    onMouseOver={this.handleMouseOver}
                    onMouseLeave={this.handleMouseLeave}
                >
                    <table>
                        <tbody>{rows}</tbody>
                    </table>
                </div>

                <AddColBtn onClick={this.handleAddColButtonClick}/>
                <AddRowBtn onClick={this.handleAddRowButtonClick}/>

                {this.state.isRemoveBtnsVisible && <RemoveColBtn offsetLeft={this.state.offsetLeft} onMouseLeave={this.handleMouseLeave} onClick={this.handleRemoveColButtonClick} />}
                {this.state.isRemoveBtnsVisible && <RemoveRowBtn offsetTop={this.state.offsetTop} onMouseLeave={this.handleMouseLeave} onClick={this.handleRemoveRowButtonClick} />}
            </div>
        )
    }
}

export default SquaresBuilder;
