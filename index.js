function minWalk(gridList, startX, startY, endX, endY) {
  const matrix = matrixParser(gridList)
  if (!matrix) {
    console.log('Invalid matrix')
    return false
  }
  const position = [startX, startY]
  const end = [endX, endY]
  const queue = []

  matrix[position[0]][position[1]] = 1
  queue.push([position]) // store a path, not just a position

  while (queue.length > 0) {
    const path = queue.shift() // get the path out of the queue
    const pos = path[path.length - 1] //  and then the last position from it
    const direction = [
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] - 1],
      [pos[0] + 1, pos[1] + 1],
      [pos[0] - 1, pos[1] - 1],
      [pos[0] + 1, pos[1] - 1],
      [pos[0] - 1, pos[1] + 1]
    ]

    for (let i = 0; i < direction.length; i++) {
      if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
        console.log(path)
        return path.length
      }
      if (
        direction[i][0] < 0 ||
        direction[i][0] >= matrix[0].length ||
        direction[i][1] < 0 ||
        direction[i][1] >= matrix[0].length ||
        matrix[direction[i][0]][direction[i][1]] != 0
      ) {
        continue
      }

      matrix[direction[i][0]][direction[i][1]] = 1
      queue.push(path.concat([direction[i]]))
    }
  }
}

function matrixParser(stringArr) {
  const newArr = stringArr.map((row) => {
    return row.split('').map((el) => {
      if (el === '.') {
        return 0
      }
      return 1
    })
  })
  if (newArr.length > 100 || newArr[0].length > 100 || newArr.length === 1) {
    return false
  }
  return newArr
}

const steps = minWalk(['.X.', '.X.', '...'], 2, 1, 0, 2)
console.log(steps)
