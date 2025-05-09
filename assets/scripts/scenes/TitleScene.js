class TitleScene extends Phaser.Scene{
    constructor() {
        super("TitleScene");
    }

    preload() {
        this.load.spritesheet('bg','/assets/images/ui/SpaceShooterAssetPack_BackGrounds.png',
            { frameWidth: 8, frameHeight: 8 }
        );
    }

    create() {
        this.add.sprite(200,450,'bg').setOrigin(0,0).setFrame(0);

        let playText = this.add.text(20,20,"Play Game").setOrigin(0,0);
        playText.setInteractive({useHandCursor: true});
        playText.on('pointerdown', () => this.playGame());
    }

    playGame() {
        this.scene.start("GameScene");
    }
}