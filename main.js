const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30


canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = [
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1
    ],
]

// Shapes
const shapes = [
    [
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [1, 1, 1, 1]
    ]
]

let currentShape = []
let currentPosition = [0, 3]
let lastTime = 0
let dropCounter = 0

// Draw function
function draw() {
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)

    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                context.fillStyle = 'yellow'
                context.fillRect(x, y, 1, 1)
            }
        })
    })
    currentShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                context.fillStyle = 'red'
                context.fillRect(currentPosition[0] + x, currentPosition[1] + y, 1, 1)
            }
        })
    })
}

function update(time = 0) {
    if (!currentShape.length) {
        let index = Math.floor(Math.random() * shapes.length)
        currentShape = shapes[index]
        console.log(currentShape)
        currentPosition = [BOARD_WIDTH / 2 - currentShape[0].length, 20]
    }
    let deltaTime = time - lastTime
    lastTime = time

    dropCounter += deltaTime

    if (dropCounter > 1000) {
        currentPosition[1] = currentPosition[1] + 1
        const check = checkCollision()
        if (check) {
            currentPosition[1] = currentPosition[1] - 1
            setPieceOnBoard()
            resetPiece()
        }
        dropCounter = 0
    }
    draw()
    window.requestAnimationFrame(update)
}

// Move shapes

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        currentPosition[0] = currentPosition[0] - 1

        if (checkCollision()) {
            currentPosition[0] = currentPosition[0] + 1
        }

        if (currentPosition[0] < 0) currentPosition[0] = 0
    }
    if (event.key === 'ArrowRight') {
        currentPosition[0] = currentPosition[0] + 1
        if (currentPosition[0] >= BOARD_WIDTH - currentShape[0].length) {
            currentPosition[0] = BOARD_WIDTH - currentShape[0].length
        }
        if (checkCollision()) {
            currentPosition[0] = currentPosition[0] - 1
        }
    }

    if (event.key === 'ArrowDown') {
        currentPosition[1] = currentPosition[1] + 1
        if (checkCollision()) {
            currentPosition[1] = currentPosition[1] - 1
        }
    }
})

function setPieceOnBoard() {
    currentShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                board[y + currentPosition[1]][x + currentPosition[0]] = 1
            }
        })
    })
}

function resetPiece() {
    currentShape = []
    currentPosition = []
}

// Check Collision
function checkCollision() {

    if (currentPosition[1] + currentShape.length > BOARD_HEIGHT) return true

    return currentShape.find((row, y) => {
        return row.find((value, x) => {
            return (
                value === 1 &&
                board[y + currentPosition[1]]?.[x + currentPosition[0]] !== 0
            )
        })
    })
}

update()