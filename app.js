const cells = document.querySelectorAll('.board');

function createPlayer(name, marker) {
  return {
    name,
    marker,
    getMarker() {
      return this.marker;
    }
  }
}

// factory function for the board module
const gameBoard = (() => {
  let board = Array.from(cells);
  
  const getBoard = function() {
    return board;
  }

  const setMove = function(index, marker) {
    if(board[index].textContent == '') {
      board[index].textContent = marker;
    }
  }

  const resetBoard = function() {
    board.forEach(box => {
      box.textContent = '';
    })
  }

  const checkForWin = function() {
    console.log('called');
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    for(let condition of winConditions) {
      const [a, b, c] = condition;

      if(board[a].textContent && board[a].textContent == board[b].textContent && board[a].textContent == board[c].textContent) {
        return true;
      }
    }
    return false;
  }
  checkForWin()

  const isBoardFull = function() {
    return board.every(box => box.textContent != '');
  }

  return {
    getBoard,
    setMove,
    resetBoard,
    checkForWin,
    isBoardFull
  }

})(); // the board function(IIFE) ends here is immediately called

const gameControl = (function() {
  let player1, player2, currentPlayer;
  
  const startGame = function(name1, marker1, name2, marker2) {
    player1 = createPlayer(name1, marker1);
    player2 = createPlayer(name2, marker2);
    currentPlayer = player1;

    // reset game board
    gameBoard.resetBoard();
  };

  const playTurn = function(index) {
    if(gameBoard.getBoard()[index].textContent == '') {
      gameBoard.setMove(index, currentPlayer.getMarker());

      if(gameBoard.checkForWin()) {
        console.log(`${currentPlayer.name} Wins`);
      }else if(gameBoard.isBoardFull()) {
        return `it's a draw`;
      }else {
        switchTurn();
      }
    }
    return null;
  }

  const switchTurn = function() {
    currentPlayer = (currentPlayer == player1) ? player2 : player1;
  }

  const getCurrentPlayer = function() {
    return currentPlayer;
  }

  return {
    startGame,
    playTurn,
    getCurrentPlayer
  }
})();

gameControl.startGame('james', 'o', 'shady', 'x');
Array.from(cells).forEach((box, index) => {
  box.addEventListener('click', () => {    
    gameControl.playTurn(index);
  })
})

