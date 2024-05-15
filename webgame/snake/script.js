// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
const canvasWidth = 470;
const canvasHeight = 470;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Snake properties
const snakeSize = 20;
let snake = [{ x: 200, y: 200 }];
let dx = snakeSize;
let dy = 0;
let currentDirection = 'right';

// Food properties
let foodX;
let foodY;

// Handle keyboard input
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  const keyPressed = event.key;
  if ((keyPressed === 'W' || keyPressed === 'w') && currentDirection !== 'down') {
    dx = 0;
    dy = -snakeSize;
    currentDirection = 'up';
  } else if ((keyPressed === 'S' || keyPressed === 's') && currentDirection !== 'up') {
    dx = 0;
    dy = snakeSize;
    currentDirection = 'down';
  } else if ((keyPressed === 'A' || keyPressed === 'a') && currentDirection !== 'right') {
    dx = -snakeSize;
    dy = 0;
    currentDirection = 'left';
  } else if ((keyPressed === 'D' || keyPressed === 'd') && currentDirection !== 'left') {
    dx = snakeSize;
    dy = 0;
    currentDirection = 'right';
  }
}


// Game loop
function gameLoop() {
  clearCanvas();
  drawFood(); // Draw food
  drawSnake();
  moveSnake();
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = 'rgb(52, 140, 252)';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === foodX && head.y === foodY) {
    // Snake eats the food
    spawnFood();
  } else {
    snake.pop();
  }
}

// Spawn food
function spawnFood() {
  foodX = Math.floor(Math.random() * (canvasWidth / snakeSize)) * snakeSize;
  foodY = Math.floor(Math.random() * (canvasHeight / snakeSize)) * snakeSize;
}

// Draw food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
}

// Start the game loop
setInterval(gameLoop, 100);

// Initial food spawn
spawnFood();


document.addEventListener('DOMContentLoaded', function() {
  // Your existing game initialization code goes here...

  // Add event listener for the restart button
  const restartButton = document.getElementById('restartButton');
  restartButton.addEventListener('click', function() {
    restartGame();
  });

  // Function to restart the game
  function restartGame() {
    // Reset snake and food positions
    snake = [{ x: 200, y: 200 }];
    dx = snakeSize;
    dy = 0;
    currentDirection = 'right';
    spawnFood();

    // Start the game loop again
    requestAnimationFrame(gameLoop);
  }
});
