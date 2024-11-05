const readline = require('readline');

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function playerTurn(player, position) {
    let dice = rollDice();
    position += dice;
    console.log(`Player ${player} rolled a ${dice} and moves to position ${position}`);
    if (position > 50) position = 25;
    if (position === 37) position = 12;
    if (position === 14) position = 7;
    if (position === 46) position = 33;
    if (position === 20) position = 35;
    if (position === 2) position = 17;
    if (position === 31) position = 43;
    console.log(`Adjusted position of Player ${player}: ${position}`);
    return position;
}

function displayPositions(player1, player2) {
    console.log(`Position of Player 1: ${player1}`);
    console.log(`Position of Player 2: ${player2}`);
}

function displayWinner(player) {
    console.log(`Congratulations! Player ${player} has won the game!`);
}

function snakeGame() {
    let player1Position = 0;
    let player2Position = 0;
    let turn = 1;

    while (player1Position < 50 && player2Position < 50) {
        player1Position = playerTurn(1, player1Position);
        if (player1Position >= 50) {
            displayWinner(1);
            break;
        }
        player2Position = playerTurn(2, player2Position);
        if (player2Position >= 50) {
            displayWinner(2);
            break;
        }
        displayPositions(player1Position, player2Position);
        turn++;
    }

    // const rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    // rl.question("Do you want to play again? (yes/no) ", (answer) => {
    //     if (answer.toLowerCase() === "yes") {
    //         snakeGame();
    //     } else {
    //         console.log("Thanks for playing!");
    //         rl.close();
    //     }
    // });
}

module.exports = { rollDice, playerTurn, displayPositions, displayWinner, snakeGame };

// Start the game
snakeGame();
