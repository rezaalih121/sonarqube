const { rollDice, playerTurn, displayPositions, displayWinner, snakeGame } = require('./snakeGame');

jest.mock('./snakeGame', () => ({
    ...jest.requireActual('./snakeGame'),
    rollDice: jest.fn(),
}));

describe('rollDice', () => {
    test('returns a number between 1 and 6', () => {
        rollDice.mockReturnValue(3); // Mocking rollDice to return 3
        const result = rollDice();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
    });
});

describe('playerTurn', () => {
    test('updates position correctly', () => {
        rollDice.mockReturnValue(3); // Mocking rollDice to return 3
        let position = 0;
        position = playerTurn(1, position);
        expect(position).toBe(3);
    });

    test('handles special cases correctly', () => {
        rollDice.mockReturnValueOnce(2); // Mocking rollDice to return 2 for the first call
        expect(playerTurn(1, 49)).toBe(25); // Exceeds 50

        rollDice.mockReturnValueOnce(0); // Mocking rollDice to return 0 for the next call
        expect(playerTurn(1, 37)).toBe(12); // Trap case

        rollDice.mockReturnValueOnce(0); // Mocking rollDice to return 0 for the next call
        expect(playerTurn(1, 14)).toBe(7);  // Trap case

        rollDice.mockReturnValueOnce(0); // Mocking rollDice to return 0 for the next call
        expect(playerTurn(1, 46)).toBe(33); // Trap case

        rollDice.mockReturnValueOnce(0); // Mocking rollDice to return 0 for the next call
        expect(playerTurn(1, 20)).toBe(35); // Bonus case

        rollDice.mockReturnValueOnce(0); // Mocking rollDice to return 0 for the next call
        expect(playerTurn(1, 2)).toBe(17);  // Bonus case

        rollDice.mockReturnValueOnce(0); // Mocking rollDice to return 0 for the next call
        expect(playerTurn(1, 31)).toBe(43); // Bonus case
    });
});

describe('displayPositions', () => {
    test('logs positions correctly', () => {
        console.log = jest.fn();
        displayPositions(10, 20);
        expect(console.log).toHaveBeenCalledWith('Position of Player 1: 10');
        expect(console.log).toHaveBeenCalledWith('Position of Player 2: 20');
    });
});

describe('displayWinner', () => {
    test('logs winner correctly', () => {
        console.log = jest.fn();
        displayWinner(1);
        expect(console.log).toHaveBeenCalledWith('Congratulations! Player 1 has won the game!');
    });
});

describe('snakeGame', () => {
    test('plays game correctly', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const promptSpy = jest.spyOn(global, 'prompt').mockImplementation(() => 'no');
        snakeGame();
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Congratulations! Player'));
        logSpy.mockRestore();
        promptSpy.mockRestore();
    });
});
