const bomb = '*'
const empty = 0

const rand = (max) => {
  const min = 0
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const miner = (rows, cols, mineCount) => {
  const obj = []
  for (let x = 0; x < cols; x++) {
    obj[x] = []
    for (let y = 0; y < rows; y++) {
      obj[x][y] = empty
    }
  }
  const drawMines = (minCounts, i) => {
    i = i || 0
    while (i < minCounts) {
      const randX = rand(rows - 1)
      const randY = rand(cols - 1)
      const cur = obj[randX][randY]
      if (cur === empty) {
        obj[randX][randY] = bomb
      } else {
        return drawMines(minCounts, i)
      }
      i++
    }
    return
  }

  const drawNumbers = () => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        checkNeighbor(x, y)
      }
    }
  }

  const checkNeighbor = (x, y) => {
    if (obj[x][y] === bomb) {
      return
    }
    const checkBN = (x, y) => {
      if ((x + 1 <= rows - 1) && obj[x + 1][y] === bomb) {
        obj[x][y] += 1
      }
    }
    const checkTN = (x, y) => {
      if ((x - 1 >= 0) && obj[x - 1][y] === bomb) {
        obj[x][y] += 1
      }
    }
    const checkRN = (x, y) => {
      if ((y + 1 <= cols - 1) && obj[x][y + 1] === bomb) {
        obj[x][y] += 1
      }
    }
    const checkLN = (x, y) => {
      if ((y - 1 >= 0) && obj[x][y - 1] === bomb) {
        obj[x][y] += 1
      }
    }

    const checkBRN = (x, y) => {
      if ((y + 1 <= cols - 1) && (x + 1 <= rows - 1) && obj[x + 1][y + 1] === bomb) {
        obj[x][y] += 1
      }
    }
    const checkTRN = (x, y) => {
      if ((y + 1 <= cols - 1) && (x - 1 >= 0) && obj[x - 1][y + 1] === bomb) {
        obj[x][y] += 1
      }
    }

    const checkTLN = (x, y) => {
      if ((y - 1 >= 0) && (x - 1 >= 0) && obj[x - 1][y - 1] === bomb) {
        obj[x][y] += 1
      }
    }

    const checkBLN = (x, y) => {
      if ((y - 1 >= 0) && (x + 1 <= rows - 1) && obj[x + 1][y - 1] === bomb) {
        obj[x][y] += 1
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
  }

  drawMines(mineCount)
  drawNumbers()
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      obj[y][x] = obj[y][x].toString()
    }
  }
  console.log('\n', obj)
}

miner(10, 10, 10)
