class Player {
    constructor() {
        this.hp = 100;
        this.attack = 10;
        this.maxHp = 100;
        this.enemiesKilled = 0;
        this.bossesKilled = 0;
    }

    heal() {
        this.hp = Math.min(this.maxHp, this.hp + this.maxHp * 0.15);
    }

    increaseAttack() {
        this.attack += 5;
    }
}

class Enemy {
    constructor(hp, attack) {
        this.hp = hp;
        this.attack = attack;
    }
}

class Boss extends Enemy {
    constructor() {
        super(200, 20);
    }
}

class Room {
    constructor(type) {
        this.type = type;
    }

    enter(player) {
        if (this.type === 'enemy') {
            let enemy = new Enemy(50, 5);
            this.fight(player, enemy);
        } else if (this.type === 'boss') {
            let boss = new Boss();
            this.fight(player, boss);
        } else if (this.type === 'heal') {
            player.heal();
            console.log('You found a healing room! Your HP is now ' + player.hp);
        } else if (this.type === 'attack') {
            player.increaseAttack();
            console.log('You found an attack upgrade room! Your attack is now ' + player.attack);
        }
    }

    fight(player, enemy) {
        console.log('A fight starts!');
        while (player.hp > 0 && enemy.hp > 0) {
            enemy.hp -= player.attack;
            if (enemy.hp > 0) {
                player.hp -= enemy.attack;
            }
        }
        if (player.hp > 0) {
            if (enemy instanceof Boss) {
                player.bossesKilled++;
                console.log('You defeated a boss!');
            } else {
                player.enemiesKilled++;
                console.log('You defeated an enemy!');
            }
        } else {
            console.log('You died!');
        }
    }
}

function generateRandomRoom() {
    const roomTypes = ['enemy', 'boss', 'heal', 'attack'];
    const randomIndex = Math.floor(Math.random() * roomTypes.length);
    return new Room(roomTypes[randomIndex]);
}

function playGame() {
    let player = new Player();
    for (let i = 0; i < 10; i++) { // Let's say the game has 10 rooms
        let room = generateRandomRoom();
        room.enter(player);
        if (player.hp <= 0) {
            break;
        }
    }
    console.log(`Game over! You killed ${player.enemiesKilled} enemies and ${player.bossesKilled} bosses.`);
}

module.exports = { Player, Enemy, Boss, Room, generateRandomRoom, playGame };
