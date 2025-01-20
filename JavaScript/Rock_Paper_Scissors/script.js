document.addEventListener('DOMContentLoaded', function () {
    let playerScore = 0;
    let computerScore = 0;

    const choices = ["rock", "paper", "scissors"];
    const resultDiv = document.getElementById("result");
    const scoreDiv = document.getElementById("score");
    const resetButton = document.getElementById("reset");

    function playGame(playerChoice) {
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        let resultMessage = `You chose <span class="highlight">${playerChoice}</span>, Computer chose <span class="highlight">${computerChoice}</span>. `;

        if (playerChoice === computerChoice) {
            resultMessage += "It's a tie!";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            resultMessage += "You win!";
            resultDiv.className = "win";
            playerScore++;
        } else {
            resultMessage += "Computer wins!";
            resultDiv.className = "lose";
            computerScore++;
        }

        updateScore();

        resultDiv.innerHTML = resultMessage;
    }

    function updateScore() {
        scoreDiv.innerText = `Player: ${playerScore} | Computer: ${computerScore}`;
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        updateScore();
        resultDiv.innerText = "";
    }

    document.querySelector('button[data-choice="rock"]').addEventListener('click', () => playGame('rock'));
    document.querySelector('button[data-choice="paper"]').addEventListener('click', () => playGame('paper'));
    document.querySelector('button[data-choice="scissors"]').addEventListener('click', () => playGame('scissors'));

    resetButton.addEventListener('click', resetGame);
});
