import React from 'react';

const DEFAULT_PADDING = 41;

const Cell = () => (<td></td>);

const Row = (props) => {
    const cells = [...Array(props.length)].map((v, i) => <Cell key={i}/>);
    return (<tr>{cells}</tr>)
};

const RemoveColBtn = (props) => {
    const style = { left: `${props.offsetLeft}px` };
    return (<div className="remove top button" style={style}>-</div>);
}

const RemoveRowBtn = (props) => {
    const style = { top: `${props.offsetTop}px` };
    return (<div className="remove left button" style={style}>-</div>);
}

class SquaresBuilder extends React.Component {
    table;

    constructor(props) {
        super(props);

        this.state = {
            x: -1,
            y: -1,
            height: Number(props.initialHeight),
            width: Number(props.initialWidth),
            offsetLeft: DEFAULT_PADDING,
            offsetTop: DEFAULT_PADDING,
            isRemoveBtnsVisible: false,
        };

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
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
        if (event.relatedTarget.classList.contains('remove')) return;
        this.setState(prev => ({ ...prev, isRemoveBtnsVisible: false }));
    }

    render() {
        const height = this.state.height;
        const width = this.state.width;

        const rows = [...Array(height)].map((v, i) => <Row length={width} key={i}/>);

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
                <div className="add right button">+</div>
                <div className="add bottom button">+</div>
                {this.state.isRemoveBtnsVisible && <RemoveColBtn offsetLeft={this.state.offsetLeft} />}
                {this.state.isRemoveBtnsVisible && <RemoveRowBtn offsetTop={this.state.offsetTop} />}
            </div>
        )
    }
}

export default SquaresBuilder;
