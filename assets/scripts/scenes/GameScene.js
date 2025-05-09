let player;
let cursors;

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image('bg', '/assets/images/ui/BlueSpace.png');
        this.load.spritesheet('player', '/assets/images/entities/SpaceShooterAssetPack_Ships.png',
            { frameWidth: 8, frameHeight: 8 }
        );
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        player = this.physics.add.sprite(200, 850, 'player').setFrame(1).setScale(3);

        // creating animations for player
        this.anims.create({
            key: 'left',
            frames: [
            {
                key: 'player',
                frame: 0
            }],
            frameRate: 20
        })

        this.anims.create({
            key: 'right',
            frames: [{
                key: 'player',
                frame: 2
            }],
            frameRate: 20
        })

        this.anims.create({
            key: 'center',
            frames: [{
                key: 'player',
                frame: 1
            }],
            frameRate: 20
        })

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // movement
        if (cursors.left.isDown) {
            player.setVelocityX(-180);
            player.anims.play('left',true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(180);
            player.anims.play('right',true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('center');
        }
    }
}