document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.querySelector('#time-left');
    const resultDisplay = document.querySelector('#result');
    const startPauseBtn = document.querySelector('.start-pausebtn');
    const squares = document.querySelectorAll('.grid div');

    let currentIndex = 76; // Starting position of the frog
    const width = 9;

    const logLeft = document.querySelectorAll('.log-left');
    const logRight = document.querySelectorAll('.log-right');
    const carsLeft = document.querySelectorAll('.car-left');
    const carsRight = document.querySelectorAll('.car-right');

    let timerId;
    let currentTime = 20;
    let gameStarted = false; // Track if the game has started

    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog');
        switch (e.key) {
            case 'ArrowLeft':
                if (currentIndex % width !== 0) currentIndex -= 1;
                break;
            case 'ArrowRight':
                if (currentIndex % width < width - 1) currentIndex += 1;
                break;
            case 'ArrowUp':
                if (currentIndex - width >= 0) currentIndex -= width;
                break;
            case 'ArrowDown':
                if (currentIndex + width < width * width) currentIndex += width;
                break;
        }
        squares[currentIndex].classList.add('frog');
    }

    function autoElements() {
        currentTime--;
        timeLeftDisplay.textContent = currentTime;
        logLeft.forEach(logLeft => moveLogLeft(logLeft));
        logRight.forEach(logRight => moveLogRight(logRight));
        carsLeft.forEach(carsLeft => moveCarLeft(carsLeft));
        carsRight.forEach(carsRight => moveCarRight(carsRight));
        lose();
        win();
    }

    function moveLogLeft(logLeft) {
        switch (true) {
            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1');
                logLeft.classList.add('l2');
                break;
            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2');
                logLeft.classList.add('l3');
                break;
            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3');
                logLeft.classList.add('l4');
                break;
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4');
                logLeft.classList.add('l5');
                break;
            case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5');
                logLeft.classList.add('l1');
                break;
        }
    }

    function moveLogRight(logRight) {
        switch (true) {
            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1');
                logRight.classList.add('l5');
                break;
            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2');
                logRight.classList.add('l1');
                break;
            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3');
                logRight.classList.add('l2');
                break;
            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4');
                logRight.classList.add('l3');
                break;
            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5');
                logRight.classList.add('l4');
                break;
        }
    }

    function moveCarLeft(carsLeft) {
        switch (true) {
            case carsLeft.classList.contains('c1'):
                carsLeft.classList.remove('c1');
                carsLeft.classList.add('c2');
                break;
            case carsLeft.classList.contains('c2'):
                carsLeft.classList.remove('c2');
                carsLeft.classList.add('c3');
                break;
            case carsLeft.classList.contains('c3'):
                carsLeft.classList.remove('c3');
                carsLeft.classList.add('c1');
                break;
        }
    }

    function moveCarRight(carsRight) {
        switch (true) {
            case carsRight.classList.contains('c1'):
                carsRight.classList.remove('c1');
                carsRight.classList.add('c3');
                break;
            case carsRight.classList.contains('c2'):
                carsRight.classList.remove('c2');
                carsRight.classList.add('c1');
                break;
            case carsRight.classList.contains('c3'):
                carsRight.classList.remove('c3');
                carsRight.classList.add('c2');
                break;
        }
    }

    function lose() {
        if (
            squares[currentIndex].classList.contains('c1') ||
            squares[currentIndex].classList.contains('l4') ||
            squares[currentIndex].classList.contains('l5') ||
            currentTime <= 0
        ) {
            resultDisplay.textContent = 'You lose!';
            clearInterval(timerId);
            squares[currentIndex].classList.remove('frog');
            document.removeEventListener('keyup', moveFrog);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }

    function win() {
        if (squares[currentIndex].classList.contains('ending-block')) {
            resultDisplay.textContent = 'You Win!';
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }

    startPauseBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
            gameStarted = false; // Mark the game as not started
            document.removeEventListener('keyup', moveFrog);
        } else {
            timerId = setInterval(autoElements, 1000);
            gameStarted = true; // Mark the game as started
            document.addEventListener('keyup', moveFrog);
            squares[currentIndex].classList.add('frog'); // Ensure frog is visible
        }
    });
});
