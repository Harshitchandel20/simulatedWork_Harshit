document.addEventListener('DOMContentLoaded', function () {
    function playGame(playerChoice) {
        const choices = ["rock", "paper", "scissors"];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        let resultMessage = `You chose ${playerChoice}, Computer chose ${computerChoice}. `;

        if (playerChoice === computerChoice) {
            resultMessage += "It's a tie!";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            resultMessage += "You win!";
        } else {
            resultMessage += "You lose!";
        }

        document.getElementById("result").innerText = resultMessage;
    }

    // Add event listeners for each button by their id
    document.getElementById("rock").addEventListener("click", () => playGame("rock"));
    document.getElementById("paper").addEventListener("click", () => playGame("paper"));
    document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));
});