import React from 'react';
import Board from '../../components/Board/Board.component';
import GameUtils from '../../utils/GameUtils';

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
        this.baseState = this.state;
    }

    resetGame() {
        this.setState(this.baseState);
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (GameUtils.calculateWinner(squares) || squares[i]) {
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
            },
        );
    }

    render() {
        let status;
        const history = this.state.history;
        const current = history[history.length - 1];
        const currentDisplayedInHistory = history[this.state.stepNumberDisplayed];
        const winner = GameUtils.calculateWinner(current.squares);
        const boardComplete = GameUtils.isBoardComplete(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Move #${move}` :
                'Game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
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
            <div>
                <div className="game">
                    <div>
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                    </div>
                </div>

                { boardComplete || winner ? <button onClick={() => this.resetGame()}>Play again</button> : null}

                <div className="game-history">
                    <div>
                        <Board
                            squares={currentDisplayedInHistory.squares}
                            onClick={() => {}}
                        />
                        <div className="game-info">
                            <ol>{moves}</ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
