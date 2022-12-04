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

  let size = n;
  const findQueen = (row) => {
    // base case
    if (row === size) {
      solution = board.rows();
      return;
    }

    // iterate over instance
    for (let col = 0; col < size; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        findQueen(row + 1);
      }
      // if there's conflict, untoggle the piece
      if (solution) {
        return;
      }
      board.togglePiece(row, col);

    }
  };

  findQueen(0);

  solution = board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {



  // count solutions
  let solutions = 0;
  // create a board
  let board = new Board({n: n});
  // define the size
  let size = n;
  // recursive function takes row
  const findSolutions = row => {
    if (row === size) {
      solutions++;
      return;
    }
    for (let i = 0; i < size; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        findSolutions(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
    // base case if row = size
      //increment solution count
      // return to colse function
    //iterate over current row
      // toggle piece at (row, i)
      // if no conflict recurse to next row
      // if there is conflict or we are on our way out toggle off
  findSolutions(0);
  return solutions;
};
