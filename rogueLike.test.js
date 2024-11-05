const { Player, Enemy, Boss, Room, generateRandomRoom, playGame } = require('./rogueLike');

describe('Player class', () => {
    test('should initialize with correct values', () => {
        const player = new Player();
        expect(player.hp).toBe(100);
        expect(player.attack).toBe(10);
        expect(player.maxHp).toBe(100);
        expect(player.enemiesKilled).toBe(0);
        expect(player.bossesKilled).toBe(0);
    });

    test('should heal correctly', () => {
        const player = new Player();
        player.hp = 50;
        player.heal();
        expect(player.hp).toBe(65); // 50 + 15% of 100
    });

    test('should increase attack correctly', () => {
        const player = new Player();
        player.increaseAttack();
        expect(player.attack).toBe(15);
    });
});

describe('Enemy class', () => {
    test('should initialize with correct values', () => {
        const enemy = new Enemy(50, 5);
        expect(enemy.hp).toBe(50);
        expect(enemy.attack).toBe(5);
    });
});

describe('Boss class', () => {
    test('should initialize with correct values', () => {
        const boss = new Boss();
        expect(boss.hp).toBe(200);
        expect(boss.attack).toBe(20);
    });
});

describe('Room class', () => {
    test('should handle enemy room correctly', () => {
        const player = new Player();
        const room = new Room('enemy');
        room.enter(player);
        expect(player.hp).toBeLessThan(100); // Player should take some damage
        expect(player.enemiesKilled).toBe(1); // Player should kill one enemy
    });

    test('should handle boss room correctly', () => {
        const player = new Player();
        const room = new Room('boss');
        room.enter(player);
        expect(player.hp).toBeLessThan(100); // Player should take some damage
        expect(player.bossesKilled).toBe(1); // Player should kill one boss
    });

    test('should handle heal room correctly', () => {
        const player = new Player();
        player.hp = 50;
        const room = new Room('heal');
        room.enter(player);
        expect(player.hp).toBe(65); // Player should heal
    });

    test('should handle attack room correctly', () => {
        const player = new Player();
        const room = new Room('attack');
        room.enter(player);
        expect(player.attack).toBe(15); // Player should increase attack
    });
});

describe('Game functionality', () => {
    test('should play game correctly', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        playGame();
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Game over! You killed'));
        logSpy.mockRestore();
    });
});
