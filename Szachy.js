// Kody dla gry w warcaby

// Tworzenie planszy
const board = document.getElementById('board');
const tiles = [];

for (let i = 0; i < 64; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  if ((i + Math.floor(i / 8)) % 2 === 0) {
    tile.classList.add('black');
  } else {
    tile.classList.add('white');
  }
  tiles.push(tile);
  board.appendChild(tile);
}

// Ustawienie pionków
const pieces = [];

for (let i = 0; i < 24; i++) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  if (i < 12) {
    piece.classList.add('red');
  } else {
    piece.classList.add('blue');
  }
  pieces.push(piece);
}

// Rozmieszczenie pionków na planszy
for (let i = 0; i < pieces.length; i++) {
  const tileIndex = i * 2 + Math.floor(i / 4) % 2;
  tiles[tileIndex].appendChild(pieces[i]);
}
