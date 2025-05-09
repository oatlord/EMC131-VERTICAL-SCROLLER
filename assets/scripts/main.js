const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 900,
    physics: {
        default: 'arcade'
    },
    scene: GameScene
};

const game = new Phaser.Game(config);