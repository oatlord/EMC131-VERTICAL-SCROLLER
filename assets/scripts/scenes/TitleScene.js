class TitleScene extends Phaser.Scene{
    constructor() {
        super("TitleScene");
    }

    preload() {
        
    }

    create() {
        this.add.text(20,20,"Play Game").setOrigin(0,0);
    }

    playGame() {
        this.scene.start("GameScene");
    }
}