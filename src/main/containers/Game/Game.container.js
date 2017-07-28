import React from 'react';
import Board from '../../components/Board/Board.component';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            stepNumberDisplayed: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.state.stepNumber !== this.state.stepNumberDisplayed) {
            alert('Showing history. Go back to last move to continue playing.');
            return;
        }

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState(
            {
                history: history.concat([{
                    squares,
                }]),
                stepNumber: history.length,
                stepNumberDisplayed: history.length,
                xIsNext: !this.state.xIsNext,
            },
        );
    }

    jumpTo(step) {
        this.setState(
            {
                stepNumberDisplayed: step,
                xIsNext: (step % 2) === 0,
            },
        );
    }

    render() {
        let status;
        const history = this.state.history;
        const current = history[this.state.stepNumberDisplayed];
        const winner = calculateWinner(current.squares);
        const boardComplete = isBoardComplete(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Move #${move}` :
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        if (winner) {
            status = `Winner: ${winner}`;
        } else if (boardComplete) {
            status = 'No winner';
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function isBoardComplete(squares) {
    let isComplete = true;
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            isComplete = false;
        }
    }
    return isComplete;
}

export default Game;