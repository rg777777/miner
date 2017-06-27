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
      if (minBoard[x][y] === bomb) {
        minBoard = changeNeighbors(minBoard, x, y)
      }
    }
  }
  return minBoard
}

const changeNeighbors = (minBoard, x, y) => {
  const rows = minBoard.length - 1
  const cols = minBoard[0].length - 1
  const xNext = x + 1
  const xPrev = x - 1
  const yNext = y + 1
  const yPrev = y - 1

  if (xNext <= rows && minBoard[xNext][y] !== bomb) {
    minBoard[xNext][y] += 1
  }

  if (xPrev >= 0 && minBoard[xPrev][y] !== bomb) {
    minBoard[xPrev][y] += 1
  }

  if (yNext <= cols && minBoard[x][yNext] !== bomb) {
    minBoard[x][yNext] += 1
  }

  if (yPrev >= 0 && minBoard[x][yPrev] !== bomb) {
    minBoard[x][yPrev] += 1
  }

  if (xNext <= rows && yNext <= cols && minBoard[xNext][yNext] !== bomb) {
    minBoard[xNext][yNext] += 1
  }

  if (xPrev >= 0 && yNext <= cols && minBoard[xPrev][yNext] !== bomb) {
    minBoard[xPrev][yNext] += 1
  }

  if (xPrev >= 0 && yPrev >= 0 && minBoard[xPrev][yPrev] !== bomb) {
    minBoard[xPrev][yPrev] += 1
  }

  if (xNext <= rows && yPrev >= 0 && minBoard[xNext][yPrev] !== bomb) {
    minBoard[xNext][yPrev] += 1
  }
  return minBoard
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
