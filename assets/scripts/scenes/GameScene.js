let player;
let cursors;
let spacebar;
let playerProjectiles;
let meteors;

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image('bg', '/assets/images/ui/BlueSpace.png');
        this.load.spritesheet('player', '/assets/images/entities/SpaceShooterAssetPack_Ships.png',
            { frameWidth: 8, frameHeight: 8 }
        );
        this.load.spritesheet('projectile', '/assets/images/projectile/SpaceShooterAssetPack_Projectiles.png',
            { frameWidth: 8, frameHeight: 8 }
        )
        this.load.spritesheet('misc', '/assets/images/misc/SpaceShooterAssetPack_Miscellaneous.png',
            { frameWidth: 8, frameHeight: 8 }
        )
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        player = this.physics.add.sprite(200, 850, 'player').setFrame(1).setScale(4);

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
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // creating player projectiles
        playerProjectiles = this.physics.add.group(); 

        // creating meteors
        meteors = this.physics.add.group();

        spacebar.on('down', () => this.shootProjectile(player));

        let timer = this.time.addEvent({
            delay: 1000,
            callback: this.spawnMeteor,
            callbackScope: this,
            loop: true
        })
    }

    update() {
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

    shootProjectile(player) {
        let playerProjectile = playerProjectiles.create(player.x, player.y, 'projectile').setFrame(7).setScale(4);
        playerProjectile.setVelocity(0,-player.y);
        playerProjectile.allowGravity = false;
    }

    spawnMeteor() {
        let meteor = meteors.create(Phaser.Math.Between(0,400),-200, 'misc').setFrame(40).setScale(4);
        meteor.setVelocity(0,200);
        meteor.allowGravity = false;
        console.log("meteor created");
    }
}