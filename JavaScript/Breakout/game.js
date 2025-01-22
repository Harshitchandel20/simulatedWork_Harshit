const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let xDirection = 2;
let yDirection = 2;

const ballDiameter = 20;
let score = 0;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

// Draw blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlocks();

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

const displayScore = document.getElementById('score');

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 20;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 20;
                drawUser();
            }
            break;
    }
}
document.addEventListener('keydown', moveUser);

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkCollisions();
}

let timerId = setInterval(moveBall, 20);

function checkCollisions() {

    if (ballCurrentPosition[0] >= boardWidth - ballDiameter || ballCurrentPosition[0] <= 0) {
        xDirection = -xDirection; 
    }
    if (ballCurrentPosition[1] >= boardHeight - ballDiameter) {
        yDirection = -yDirection;
    }

    if (
        ballCurrentPosition[0] + ballDiameter > currentPosition[0] && 
        ballCurrentPosition[0] < currentPosition[0] + blockWidth && 
        ballCurrentPosition[1] <= currentPosition[1] + blockHeight && 
        ballCurrentPosition[1] + ballDiameter >= currentPosition[1]
    ) {
        yDirection = -yDirection; 
        ballCurrentPosition[1] = currentPosition[1] + blockHeight;
    }

    blocks.forEach((block, index) => {
        if (
            ballCurrentPosition[0] > block.bottomLeft[0] &&
            ballCurrentPosition[0] < block.bottomRight[0] &&
            ballCurrentPosition[1] > block.bottomLeft[1] &&
            ballCurrentPosition[1] < block.topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[index].classList.remove('block'); 
            blocks.splice(index, 1); 
            yDirection = -yDirection; 
            score += 10;
            displayScore.innerHTML = `Score: ${score}`; 
        }
    });

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        alert(`Game Over! Your score is ${score}.`);
        location.reload();
    }

    if (blocks.length === 0) {
        clearInterval(timerId);
        alert(`You win! Your final score is ${score}.`);
        location.reload();
    }
}

const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    location.reload();
});
