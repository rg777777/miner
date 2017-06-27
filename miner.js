const bomb = '*'
const empty = 0

const rand = (max) => {
  const min = 0
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const drawBoard = (rows, cols) => {
  const board = []
  for (let x = 0; x < cols; x++) {
    board[x] = []
    for (let y = 0; y < rows; y++) {
      board[x][y] = empty
    }
  }
  return board
}

const drawMines = (board, minCounts, i) => {
  const minBoard = board
  i = i || 0
  while (i < minCounts) {
    const randX = rand(minBoard.length - 1)
    const randY = rand(minBoard[0].length - 1)
    const cur = minBoard[randX][randY]
    if (cur === empty) {
      minBoard[randX][randY] = bomb
    } else {
      return drawMines(minBoard, minCounts, i)
    }
    i++
  }
  return minBoard
}

const drawNumbers = (minBoard) => {
  for (let y = 0; y < minBoard.length; y++) {
    for (let x = 0; x < minBoard[0].length; x++) {
      minBoard[x][y] = checkNeighbor(minBoard, x, y)
    }
  }
  return minBoard
}

const checkNeighbor = (minBoard, x, y) => {
  let count = 0
  const rows = minBoard.length - 1
  const cols = minBoard[0].length - 1
  console.log()
  if (minBoard[x][y] === bomb) {
    return bomb
  }

  const checkBN = (x, y) => {
    if ((x + 1 <= rows) && minBoard[x + 1][y] === bomb) {
      count += 1
    }
  }

  const checkTN = (x, y) => {
    if ((x - 1 >= 0) && minBoard[x - 1][y] === bomb) {
      count += 1
    }
  }

  const checkRN = (x, y) => {
    if ((y + 1 <= cols) && minBoard[x][y + 1] === bomb) {
      count += 1
    }
  }

  const checkLN = (x, y) => {
    if ((y - 1 >= 0) && minBoard[x][y - 1] === bomb) {
      count += 1
    }
  }

  const checkBRN = (x, y) => {
    if ((y + 1 <= cols) && (x + 1 <= rows) && minBoard[x + 1][y + 1] === bomb) {
      count += 1
    }
  }
  const checkTRN = (x, y) => {
    if ((y + 1 <= cols) && (x - 1 >= 0) && minBoard[x - 1][y + 1] === bomb) {
      count += 1
    }
  }

  const checkTLN = (x, y) => {
    if ((y - 1 >= 0) && (x - 1 >= 0) && minBoard[x - 1][y - 1] === bomb) {
      count += 1
    }
  }

  const checkBLN = (x, y) => {
    if ((y - 1 >= 0) && (x + 1 <= rows) && minBoard[x + 1][y - 1] === bomb) {
      count += 1
    }
  }
  checkBLN(x, y)
  checkTLN(x, y)
  checkBRN(x, y)
  checkTRN(x, y)
  checkBN(x, y)
  checkLN(x, y)
  checkTN(x, y)
  checkRN(x, y)
  return count
}

const miner = (rows, cols, mineCount) => {
  const board = drawBoard(rows, cols)
  const boardMines = drawMines(board, mineCount)

  const parsedBoard = drawNumbers(boardMines)
  for (let y = 0; y < parsedBoard.length; y++) {
    for (let x = 0; x < parsedBoard[0].length; x++) {
      parsedBoard[y][x] = parsedBoard[y][x].toString()
    }
  }
  console.log('\n', parsedBoard)
}
// (rows, cols, mineCount)
miner(10, 10, 10)
