let blueBg,blueStars;
let menuMusic;

class TitleScene extends Phaser.Scene{
    constructor() {
        super("TitleScene");
    }

    init() {
        this.playButton = null
    }

    preload() {
        this.load.image('tileBg', 'assets/images/ui/blue space tilemap pack/space_background_pack/Assets/Blue Version/layered/blue-back.png');
        this.load.image('tileBgStars', 'assets/images/ui/blue space tilemap pack/space_background_pack/Assets/Blue Version/layered/blue-stars.png');

        this.load.audio('menuBgm', 'assets/audio/bgm/Astral Float.m4a');

        this.load.image('playButtonNormal','assets/images/ui/play buttons/playButtonNormal.png');
        this.load.image('playButtonClicked', 'assets/images/ui/play buttons/playButtonClicked.png');
    }

    create() {
        menuMusic = this.sound.add('menuBgm');
        menuMusic.setLoop(true);
        menuMusic.play();

        blueBg = this.add.tileSprite(-80, 0, 400, 900, 'tileBg').setOrigin(0, 0).setScale(2);
        blueStars = this.add.tileSprite(-80, 0, 400, 900, 'tileBgStars').setOrigin(0, 0).setScale(2);

        this.add.text(135,300,"Space Shooter");
        this.add.text(20,820,"Playable Assets: Gustavo Vituri");
        this.add.text(20,840,"Background Assets: Ansimuz");
        this.add.text(20,860,"Music & SFX: Kyra van Meijl")

        this.playButton = this.add.sprite(200,450,'playButtonNormal').setScale(5).setInteractive(
            {useHandCursor: true}
        );
        this.playButton.on('pointerdown', () => this.playGame());
    }

    update() {
        scrollBg();
    }

    playGame() {
        menuMusic.stop()
        this.scene.start("GameScene");
    }
}

function scrollBg() {
        blueBg.tilePositionY -= 0.2;
        blueStars.tilePositionY -= 0.2;
    }