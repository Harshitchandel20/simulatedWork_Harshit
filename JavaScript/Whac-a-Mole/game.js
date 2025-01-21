const squares = document.querySelectorAll('.square')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const resetButton = document.getElementById('reset-btn')

let result = 0
let hitPosition
let currentTime = 60 
let timerId = null

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole') 
    })

    const randomPosition = squares[Math.floor(Math.random() * squares.length)]
    randomPosition.classList.add('mole') 
    hitPosition = randomPosition.id 
}

resetButton.addEventListener('click',()=> location.reload())   


function moveMole() {
    timerId = setInterval(randomSquare, 1000)
}

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.id === hitPosition) {
            result++ 
            score.textContent = result 
            hitPosition = null
        }
    })
})
function countdown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime === 0) {
        clearInterval(timerId) 
        clearInterval(countdownTimerId) 
        alert(`Game over! Your final score is ${result}`)
    }
}

moveMole()
const countdownTimerId = setInterval(countdown, 1000)