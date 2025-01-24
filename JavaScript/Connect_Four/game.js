document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const result = document.querySelector('#result')
    const dispplayCurrentPlayer = document.querySelector('#current-player')
    let currentPlayer = 1
    let isGameOver = false
    const initialBlocks = document.querySelectorAll('.always-taken')


    const generateWinningCombinations = () => {
        const combinations = []
        const rows = 6
        const cols = 7

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols - 3; col++) {
                const start = row * cols + col
                combinations.push([start, start + 1, start + 2, start + 3])
            }
        }

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows - 3; row++) {
                const start = row * cols + col
                combinations.push([start, start + cols, start + (cols * 2), start + (cols * 3)])
            }
        }

        for (let row = 0; row < rows - 3; row++) {
            for (let col = 0; col < cols - 3; col++) {
                const start = row * cols + col
                combinations.push([start, start + cols + 1, start + (cols * 2) + 2, start + (cols * 3) + 3])
            }
        }

        for (let row = 0; row < rows - 3; row++) {
            for (let col = 3; col < cols; col++) {
                const start = row * cols + col
                combinations.push([start, start + cols - 1, start + (cols * 2) - 2, start + (cols * 3) - 3])
            }
        }

        return combinations
    }

    const winingArrays = generateWinningCombinations()

    function checkBoard() {

        for (const combination of winingArrays) {
            const [a, b, c, d] = combination

            if (squares[a].classList.contains('player-one') &&
                squares[b].classList.contains('player-one') &&
                squares[c].classList.contains('player-one') &&
                squares[d].classList.contains('player-one')) {
                result.innerHTML = "Player One Wins!"
                isGameOver = true
                return
            }

            if (squares[a].classList.contains('player-two') &&
                squares[b].classList.contains('player-two') &&
                squares[c].classList.contains('player-two') &&
                squares[d].classList.contains('player-two')) {
                result.innerHTML = "Player Two Wins!"
                isGameOver = true
                return
            }
        }
    }

    for (let i = 0; i < squares.length; i++) {

        squares[i].onclick = () => {

            if (isGameOver) return

            if (squares[i + 7].classList.contains('taken') && !squares[i].classList.contains('taken')) {
                if (currentPlayer == 1) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-one')
                    currentPlayer = 2
                    dispplayCurrentPlayer.innerHTML = currentPlayer
                } else if (currentPlayer == 2) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-two')
                    currentPlayer = 1
                    dispplayCurrentPlayer.innerHTML = currentPlayer
                }
            } else {
                alert("Can't go here!")
            }
            checkBoard()
        }
    }

    document.getElementById('reset').addEventListener('click', () => {
        squares.forEach(square => {
            square.classList.remove('taken','player-one', 'player-two')
        })
        isGameOver = false
        result.innerHTML = ''
        currentPlayer = 1
        dispplayCurrentPlayer.innerHTML = currentPlayer

        initialBlocks.forEach(block => {
            block.classList.add('taken')
        })
    })
})