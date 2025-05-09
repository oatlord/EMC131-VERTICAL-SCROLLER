let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 300,
    scene: [TitleScene, GameScene, GameOverScene]
};

let game = new Phaser.Game(config);