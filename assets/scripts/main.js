let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 900,
    scene: [TitleScene, GameScene, GameOverScene]
};

let game = new Phaser.Game(config);