const { rollDice, playerTurn, displayPositions, displayWinner, snakeGame } = require('./snakeGame'); // Replace with your actual file name

describe('Snake Game Functions', () => {
  test('rollDice should return a number between 1 and 6', () => {
    for (let i = 0; i < 100; i++) {
      const result = rollDice();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    }
  });

  test('playerTurn should update position correctly', () => {
    const initialPosition = 0;
    const newPosition = playerTurn(1, initialPosition);
    expect(newPosition).toBeGreaterThanOrEqual(1);
    expect(newPosition).toBeLessThanOrEqual(50);
  });

  test('displayPositions should log player positions', () => {
    console.log = jest.fn();
    displayPositions(10, 20);
    expect(console.log).toHaveBeenCalledWith('Position of Player 1: 10');
    expect(console.log).toHaveBeenCalledWith('Position of Player 2: 20');
  });

  test('displayWinner should log the winner', () => {
    console.log = jest.fn();
    displayWinner(1);
    expect(console.log).toHaveBeenCalledWith('Congratulations! Player 1 has won the game!');
  });

  test('snakeGame should run without errors', () => {
    console.log = jest.fn(); // Mock console.log to avoid cluttering the test output
    expect(() => snakeGame()).not.toThrow();
  });
});
