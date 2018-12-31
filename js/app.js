// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Define the size of a horizontal move
    this.horizontalMove = 101;
    // Define the size of a vertical move
    this.verticalMove = 83;
    // Position is declared when instantiating the class
    this.x = x;
    this.y = y;
    // Define the limitation of moves
    this.limit = this.horizontalMove * 5;
    // Define where the enemy enters the screen
    this.start = - this.horizontalMove;
    // Speed is declared when instantiating the class
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.limit) {
        this.x += this.speed * dt;
    } else {
        this.x = this.start;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-cat-girl.png';
        this.horizontalMove = 101;
        this.verticalMove = 83;
        // Default position of the player, it is set when the game starts or 
        // when the game is replayed
        this.defaultX = this.horizontalMove * 2;
        this.defaultY = this.verticalMove * 5 - 10;
        // Define current position
        this.x = this.defaultX
        this.y = this.defaultY;
        // Define the winning position of the player
        this.winningPosition = this.verticalMove - 10;
        // Victory property is set to false by default
        this.victory = false;
    }
    // Check the player's current position and certain conditions
    update() {
        // Check if the player collides with any of the enemies
        for (var i = 0; i < allEnemies.length; i++) {
            if (this.y === allEnemies[i].y && (allEnemies[i].x + allEnemies[i].horizontalMove / 5 * 4 > this.x && allEnemies[i].x < this.x + this.horizontalMove / 5 * 4)) {
                this.reset();
            }
        }
        // Check if the player won / is in winning position
        if (this.y === this.winningPosition) {
            // Set victory property to true that will be used as a condition in engine.js
            this.victory = true;
        }
    }
    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Update the player's position within given boundaries
    handleInput(input) {
        if (input == 'left') {
            if (this.x > 0) {
                this.x -= this.horizontalMove;
            }
        } else if (input == 'up') {
            if (this.y > this.verticalMove) {
                this.y -= this.verticalMove;
            }
        } else if (input == 'right') {
            if (this.x < this.horizontalMove * 4) {
                this.x += this.horizontalMove;
            }
        } else if (input == 'down') {
            if (this.y < this.verticalMove * 4) {
                this.y += this.verticalMove;
            }
        }
    }
    // Reset the player's position to default
    reset() {
        this.x = this.defaultX;
        this.y = this.defaultY;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const enemy1 = new Enemy(-101, 73, 100);
const enemy2 = new Enemy(-101 * 5, 156, 200);
const enemy3 = new Enemy(-101 * 2.5, 239, 300);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter', // Additional allowed key for replaying the game after winning the game
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
