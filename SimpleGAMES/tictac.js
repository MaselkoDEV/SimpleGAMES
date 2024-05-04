let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function playerMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        renderBoard();
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.innerText = board[row][col];
    });
}

function checkWinner() {
    // Sprawdzanie wierszy
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            alert(`${board[i][0]} wygrał!`);
            resetBoard();
            return;
        }
    }

    // Sprawdzanie kolumn
    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            alert(`${board[0][i]} wygrał!`);
            resetBoard();
            return;
        }
    }

    // Sprawdzanie przekątnych
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        alert(`${board[0][0]} wygrał!`);
        resetBoard();
        return;
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        alert(`${board[0][2]} wygrał!`);
        resetBoard();
        return;
    }

    // Sprawdzanie remisu
    if (!board.flat().includes('')) {
        alert("Remis!");
        resetBoard();
        return;
    }
}

function resetBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    renderBoard();
    currentPlayer = 'X';

function aiMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'O';
                let score = minMax(board, 0, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { row: i, col: j };
                }
            }
        }
    }

    playerMove(move.row, move.col);
}

function minMax(board, depth, isMaximizing) {
    let result = checkResult();
    if (result !== null) {
        return result === 'O' ? 1 : result === 'X' ? -1 : 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    let score = minMax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    let score = minMax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

function checkResult() {
    // Funkcja sprawdzająca zwycięstwo lub remis
    // ...

    // Jeśli nie ma jeszcze rezultatu
    return null;
}

}

