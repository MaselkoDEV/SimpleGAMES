// Stałe
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 25;
const numRows = Math.floor(canvas.height / cellSize);
const numCols = Math.floor(canvas.width / cellSize);
const moveInterval = 150; // Zwiększony interwał ruchu węża w milisekundach dla zmniejszenia prędkości

// Zmienne
let snake = [{ x: 10, y: 10 }];
let apples = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };
let growthPending = 0;

// Funkcja rysująca planszę i obsługująca główną pętlę gry
function drawBoard() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApples();
}

// Funkcja rysująca węża
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });
}

// Funkcja rysująca jabłka
function drawApples() {
    ctx.fillStyle = "red";
    apples.forEach(apple => {
        ctx.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);
    });
}

// Funkcja poruszająca węża
function moveSnake() {
    const newHead = {
        x: (snake[0].x + direction.x + numCols) % numCols,
        y: (snake[0].y + direction.y + numRows) % numRows
    };

    // Sprawdź, czy nowa głowa węża zderza się z którymkolwiek segmentem ciała węża
    if (snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        gameOver();
        return;
    }

    apples.forEach((apple, index) => {
        if (newHead.x === apple.x && newHead.y === apple.y) {
            apples.splice(index, 1);
            growthPending += 2;
            addApple();
        }
    });

    snake.unshift(newHead);

    if (growthPending === 0) {
        snake.pop();
    } else {
        growthPending--;
    }

    drawBoard();
}


// Funkcja dodająca nowe jabłko na losową pozycję
function addApple() {
    let newApple;
    do {
        newApple = {
            x: Math.floor(Math.random() * numCols),
            y: Math.floor(Math.random() * numRows)
        };
    } while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y));

    apples.push(newApple);
}

// Obsługa klawiszy
document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y !== 1) {
                direction = { x: 0, y: -1 };
            }
            break;
        case "ArrowDown":
            if (direction.y !== -1) {
                direction = { x: 0, y: 1 };
            }
            break;
        case "ArrowLeft":
            if (direction.x !== 1) {
                direction = { x: -1, y: 0 };
            }
            break;
        case "ArrowRight":
            if (direction.x !== -1) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
});

// Rozpocznij grę po załadowaniu strony
window.onload = function() {
    addApple(); // Dodaj pierwsze jabłko
    gameLoop = setInterval(moveSnake, moveInterval);
};

// Funkcja kończąca grę
function gameOver() {
    clearInterval(gameLoop);
    alert("Game Over!");
}

