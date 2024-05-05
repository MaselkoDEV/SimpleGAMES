const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Gracz
const playerWidth = 20;
const playerHeight = 20;
let playerX = (canvas.width - playerWidth) / 2;

// Przeciwnicy
const enemyRowCount = 5;
const enemyColumnCount = 10;
const enemyWidth = 30;
const enemyHeight = 30;
const enemyPadding = 10;
const enemyOffsetTop = 30;
const enemyOffsetLeft = 30;
let enemies = [];
for (let c = 0; c < enemyColumnCount; c++) {
    enemies[c] = [];
    for (let r = 0; r < enemyRowCount; r++) {
        enemies[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Strzały
const bulletRadius = 2;
let bulletX = playerX + playerWidth / 2;
let bulletY = canvas.height - playerHeight;

// Sterowanie
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Główna pętla gry
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemies();
    drawBullet();

    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += 3;
    } else if (leftPressed && playerX > 0) {
        playerX -= 3;
    }

    requestAnimationFrame(draw);
}

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawEnemies() {
    for (let c = 0; c < enemyColumnCount; c++) {
        for (let r = 0; r < enemyRowCount; r++) {
            if (enemies[c][r].status === 1) {
                const enemyX = c * (enemyWidth + enemyPadding) + enemyOffsetLeft;
                const enemyY = r * (enemyHeight + enemyPadding) + enemyOffsetTop;
                enemies[c][r].x = enemyX;
                enemies[c][r].y = enemyY;
                ctx.beginPath();
                ctx.rect(enemyX, enemyY, enemyWidth, enemyHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBullet() {
    ctx.beginPath();
    ctx.arc(bulletX, bulletY, bulletRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    bulletY -= 3;
}

draw();
