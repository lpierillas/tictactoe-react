const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i += 1) {
        const [a, b, c] = lines[i];
        if (squares[a] !== '-' && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

const isBoardComplete = (squares) => {
    let isComplete = true;
    for (let i = 0; i < squares.length; i += 1) {
        if (squares[i] === '-') {
            isComplete = false;
        }
    }
    return isComplete;
};

const squareAlreadyFilled = square => (square === 'X' || square === 'O');

const getGameStatus = (currentBoard, xIsNext) => {
    const winner = calculateWinner(currentBoard);
    const boardComplete = isBoardComplete(currentBoard);

    if (winner) {
        return `Winner: ${winner}`;
    } else if (boardComplete) {
        return 'No winner';
    }

    return `Next player: ${xIsNext ? 'X' : 'O'}`;
};

export default {
    calculateWinner,
    isBoardComplete,
    squareAlreadyFilled,
    getGameStatus,
};
