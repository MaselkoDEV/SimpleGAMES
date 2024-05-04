document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const size = 10; // rozmiar planszy
  const bombs = 10; // ilość min

  let cells = [];
  let flagged = 0;

  function createBoard() {
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'hidden');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', revealCell);
        cell.addEventListener('contextmenu', flagCell);
        row.push(cell);
        board.appendChild(cell);
      }
      cells.push(row);
    }
    plantBombs();
  }

  function plantBombs() {
    let planted = 0;
    while (planted < bombs) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (!cells[row][col].classList.contains('bomb')) {
        cells[row][col].classList.add('bomb');
        planted++;
      }
    }
  }

  function revealCell(event) {
    const cell = event.target;
    if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return;

    if (cell.classList.contains('bomb')) {
      revealAllBombs();
      alert('Przegrałeś!');
      return;
    }

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const bombCount = countAdjacentBombs(row, col);

    if (bombCount === 0) {
      cell.classList.add('revealed');
      revealAdjacentEmptyCells(row, col);
    } else {
      cell.classList.add('revealed');
      cell.textContent = bombCount;
    }
  }

  function countAdjacentBombs(row, col) {
    let count = 0;
    for (let i = Math.max(0, row - 1); i <= Math.min(size - 1, row + 1); i++) {
      for (let j = Math.max(0, col - 1); j <= Math.min(size - 1, col + 1); j++) {
        if (cells[i][j].classList.contains('bomb')) {
          count++;
        }
      }
    }
    return count;
  }

  function revealAdjacentEmptyCells(row, col) {
    for (let i = Math.max(0, row - 1); i <= Math.min(size - 1, row + 1); i++) {
      for (let j = Math.max(0, col - 1); j <= Math.min(size - 1, col + 1); j++) {
        if (!cells[i][j].classList.contains('revealed')) {
          revealCell({ target: cells[i][j] });
        }
      }
    }
  }

  function flagCell(event) {
    event.preventDefault();
    const cell = event.target;
    if (!cell.classList.contains('revealed')) {
      if (cell.classList.contains('flag')) {
        cell.classList.remove('flag');
        cell.textContent = '';
        flagged--;
      } else {
        cell.classList.add('flag');
        cell.textContent = '🚩';
        flagged++;
      }
      checkWin();
    }
  }

  function revealAllBombs() {
    cells.flat().forEach(cell => {
      if (cell.classList.contains('bomb')) {
        cell.classList.add('revealed');
        cell.textContent = '💣';
      }
    });
  }

  function checkWin() {
    if (flagged === bombs) {
      let correctFlags = 0;
      cells.flat().forEach(cell => {
        if (cell.classList.contains('flag') && cell.classList.contains('bomb')) {
          correctFlags++;
        }
      });
      if (correctFlags === bombs) {
        alert('Wygrałeś!');
      }
    }
  }

  createBoard();
});
