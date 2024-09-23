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
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    for(let condition of winConditions) {
      const [a, b, c] = condition;
      
      if(board[a] && board[a] == board[b] && board[a] == board[c]) {
        return true;
      }else {
        return false;
      }
    }
  }

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

})();