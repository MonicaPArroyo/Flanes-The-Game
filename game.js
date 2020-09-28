const gameState = {
};

const config = {
        type: Phaser.AUTO,
        width: 500,
        height: 600,
        backgroundColor: "154360",
        physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            enableBody: true,
        }
    },
    scene: [sherlock]
};

const game = new Phaser.Game(config);