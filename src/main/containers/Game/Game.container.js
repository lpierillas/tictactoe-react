import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import Board from '../../components/Board/Board.component';
import GameUtils from '../../utils/GameUtils';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                id: 0,
                squares: Array(9).fill('-'),
            }],
            stepDisplayedInHistory: 0,
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
                    id: history.length,
                    squares,
                }]),
                stepDisplayedInHistory: history.length,
                xIsNext: !this.state.xIsNext,
            },
        );
    }

    jumpTo(step) {
        this.setState(
            {
                stepDisplayedInHistory: step,
            },
        );
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const currentDisplayedInHistory = history[this.state.stepDisplayedInHistory];
        const status = GameUtils.getGameStatus(current.squares, this.state.xIsNext);
        const endOfGame = GameUtils.calculateWinner(current.squares) || GameUtils.isBoardComplete(current.squares);
        const moves = history.map((step) => {
            const desc = step.id ?
                `Move #${step.id}` :
                'Game start';
            return (
                <li key={step.id}>
                    <button className="flat-button" onClick={() => this.jumpTo(step.id)}>{desc}</button>
                </li>
            );
        });

        return (
            <Grid className="game">
                <Row className="show-grid">
                    <Col md={10} className="game-board">
                        <div className="game-info">{status}</div>
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                        { endOfGame ? <Button bsStyle="primary" onClick={() => this.resetGame()}>Play again</Button> : null}
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
        );
    }
}

export default Game;
