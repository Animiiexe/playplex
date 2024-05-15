const PLAYER_X = "X";
const PLAYER_O = "O";

let currentPlayer = PLAYER_X;

let gameState = ["", "", "", "", "", "", "", "", ""];

let isGameActive = true;

const handleCellClick = (cell, cellIndex) => {
  if (gameState[cellIndex] !== "" || !isGameActive) {
    return;
  }


  cell.textContent = currentPlayer;


  gameState[cellIndex] = currentPlayer;

 
  if (checkWin()) {
    isGameActive = false;
    displayMessage(`${currentPlayer} wins!`);
    return;
  }


  if (isDraw()) {
    isGameActive = false;
    displayMessage("It's a draw!");
    return;
  }

 
  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  displayMessage(`${currentPlayer}'s turn`);


  if (currentPlayer === PLAYER_O && isGameActive) {
    setTimeout(makeAIMove, 500); // AI's turn after a short delay
  }
};


const checkWin = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6], 
  ];

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
};


const isDraw = () => {
  return !gameState.includes("");
};


const displayMessage = (message) => {
  document.getElementById("message").textContent = message;
};


const makeAIMove = () => {
 
  const emptyCells = gameState.reduce((acc, cell, index) => {
    if (cell === "") {
      acc.push(index);
    }
    return acc;
  }, []);


  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cellIndex = emptyCells[randomIndex];

  const cell = document.querySelectorAll(".cell")[cellIndex];
  handleCellClick(cell, cellIndex);
};


const handleRestartGame = () => {

  gameState = ["", "", "", "", "", "", "", "", ""];
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.textContent = ""));


  isGameActive = true;
  currentPlayer = PLAYER_X;
  displayMessage(`${currentPlayer}'s turn`);

  if (currentPlayer === PLAYER_O) {
    setTimeout(makeAIMove, 500); 
  }
};


const cells = document.querySelectorAll(".cell");
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});


const restartButton = document.getElementById("restart-btn");
restartButton.addEventListener("click", handleRestartGame);


displayMessage(`${currentPlayer}'s turn`);


