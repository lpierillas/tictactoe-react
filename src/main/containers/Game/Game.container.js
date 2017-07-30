import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import Board from '../../components/Board/Board.component';
import GameUtils from '../../utils/GameUtils';


class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill('-'),
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

        if (GameUtils.calculateWinner(squares) || GameUtils.squareAlreadyFilled(squares[i])) {
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
                    <button className="flat-button" onClick={() => this.jumpTo(move)}>{desc}</button>
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
                <Grid>
                    <Row className="show-grid">
                        <Col md={10} className="game-board">
                            <div className="game-info">{status}</div>
                            <Board
                                squares={current.squares}
                                onClick={i => this.handleClick(i)}
                            />
                            { boardComplete || winner ? <Button bsStyle="primary" onClick={() => this.resetGame()}>Play again</Button> : null}
                        </Col>
                        <Col md={2} className="game-history">
                            <div className="game-info">Game History</div>
                            <Board
                                squares={currentDisplayedInHistory.squares}
                                onClick={() => {}}
                            />
                            <div className="moves-list">
                                <ol>{moves}</ol>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Game;
