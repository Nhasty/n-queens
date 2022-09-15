/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let board = new Board({n: n});

  for (let i = 0; i < board.rows().length; i++) {
    for (let j = 0; j < board.rows().length; j++) {
      board.togglePiece(i, j);
      // is checking whether it is promising or not
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      }
    }
  }

  let solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  let rooksPut = 0;
  let board = new Board({n: n});

  // recursive induction (n, accumulator)
  // accumulator =
  // base case is rooks placed = 4
  // call findNRoooksSolutions(n -1)

  //
  // recursive function board, #ofRooksPut, row
  const countRook = (board, rooksPut, r) => {
    //   if #ofRooksPut === n -> solutioncnt += 1
    if (rooksPut === n) {
      solutionCount += 1;
      return;
    }
    //   iterating from 0 to n
    for (let i = 0; i < n; i++) {
      board.togglePiece(r, i);
      // if no conflicts, we try to call recursively
      // to check whether we can put rooks on r+1 row position
      if (!board.hasColConflictAt(i)) {
        countRook(board, rooksPut + 1, r + 1);
      }
      board.togglePiece(r, i);
    }
  };
  //     toggle at row, col
  //     if there's  no conflict, recursive call
  //     toggle at updated row, col


  countRook(board, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  let board = new Board({n: n});
  let count = 0;
  if (n === 0) {
    return [];
  }
  for (let i = 0; i < n; i++) {
    board.togglePiece(0, i);
    if (i > 0) {
      board.togglePiece(0, i - 1);
    }
    for (let k = 0; k < n; k++) {
      for (let j = 0; j < n; j++) {
        if (board.attributes[k][j] !== 1) {
          board.togglePiece(k, j);
        }
        if (board.hasAnyQueenConflictsOn(k, j)) {
          board.togglePiece(k, j);
        }
      }
    }
  }
  // board.togglePiece(0, 1);
  // // iterate over length
  //   board.togglePiece(i,i)
  //   for (let j = 0; j < n; j++) {
  //     board.togglePiece(i, j);
  //     count++;
  //     if (board.hasAnyQueenConflictsOn(i, j)) {
  //       board.togglePiece(i, j);
  //       count--;
  //     }

  //     if (count === n) {
  //       console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //       return board.attributes;
  //     }
  solution = board.rows();
  //iterate over length
  //toggle at (i,j)
  // if hasAnyQueenConflictsOn (row, col)
  //toggle off
  // solution = board.rows
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  const board = new Array(n).fill(0);

  const isPromising = (board, row) => {
    for (let i = 0; i < row; i++) {
      if (board[i] === board[row] || Math.abs(board[row] - board[i]) === row - i) {
        return false;
      }
    }
    return true;
  };

  const backtrack = (board, row, n) => {
    if (row === n) {
      solutionCount += 1;
      return;
    } else {
      for (let i = 0; i < n; i++) {
        board[row] = i;
        if (isPromising(board, row)) {
          backtrack(board, row + 1, n);
        }
      }
    }
  };

  backtrack(board, 0, n);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
