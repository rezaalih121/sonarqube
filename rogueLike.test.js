const { Player, Enemy, Boss, Room, generateRandomRoom, playGame } = require('./rogueLike'); // Replace with your actual file name

describe('Game Classes and Functions', () => {
  test('Player class should initialize correctly', () => {
    const player = new Player();
    expect(player.hp).toBe(100);
    expect(player.attack).toBe(10);
    expect(player.maxHp).toBe(100);
    expect(player.enemiesKilled).toBe(0);
    expect(player.bossesKilled).toBe(0);
  });

  test('Enemy class should initialize correctly', () => {
    const enemy = new Enemy(50, 5);
    expect(enemy.hp).toBe(50);
    expect(enemy.attack).toBe(5);
  });

  test('Boss class should initialize correctly', () => {
    const boss = new Boss();
    expect(boss.hp).toBe(200);
    expect(boss.attack).toBe(20);
  });

  test('Room class should initialize and handle player interactions correctly', () => {
    const player = new Player();
    const room = new Room('enemy');
    room.enter(player);
    expect(player.hp).toBeLessThanOrEqual(player.maxHp);
  });

  test('generateRandomRoom should return a Room instance', () => {
    const room = generateRandomRoom();
    expect(room).toBeInstanceOf(Room);
  });

  test('playGame should run without errors', () => {
    expect(() => playGame()).not.toThrow();
  });
});
