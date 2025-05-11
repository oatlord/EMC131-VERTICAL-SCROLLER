class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");

        // Initialize properties
        this.player = null;
        this.cursors = null;
        this.spacebar = null;
        this.playerProjectiles = null;
        this.enemyProjectiles = null;
        this.meteors = null;
        this.enemies = null;
        // this.blueBg = null;
        // this.blueStars = null;
        this.gameBgm = null;
        this.playerHealth = 3;
        this.timeSurvived = 0;
        this.score = 0;
        this.scoreText = null;
        this.timeSurvivedText = null;
    }

    preload() {
        // loading in spritesheets
        this.load.spritesheet('player', '/assets/images/entities/SpaceShooterAssetPack_Ships.png',
            { frameWidth: 8, frameHeight: 8 }
        );
        this.load.spritesheet('projectile', '/assets/images/projectile/SpaceShooterAssetPack_Projectiles.png',
            { frameWidth: 8, frameHeight: 8 }
        )
        this.load.spritesheet('misc', '/assets/images/misc/SpaceShooterAssetPack_Miscellaneous.png',
            { frameWidth: 8, frameHeight: 8 }
        )

        // loading in tilemap assets

        // loading in audio
        this.load.audio('gameBgm', '/assets/audio/bgm/Space Main Theme.mp3');

        // loading in sfx
        this.load.audio('break1Sfx', '/assets/audio/sfx/Block Break 1.wav');
        this.load.audio('enemyHitSfx', '/assets/audio/sfx/Boss hit 1.wav');
        this.load.audio('shootSfx', '/assets/audio/sfx/Blow 1V2.mp3');
        this.load.audio('hitSfx', '/assets/audio/sfx/Hit damage 1.wav');
    }

    create() {
        // Background
        blueBg = this.add.tileSprite(-80, 0, 400, 900, 'tileBg').setOrigin(0, 0).setScale(2);
        blueStars = this.add.tileSprite(-80, 0, 400, 900, 'tileBgStars').setOrigin(0, 0).setScale(2);

        // Music
        this.gameBgm = this.sound.add('gameBgm');
        this.gameBgm.setLoop(true);
        this.gameBgm.play();

        // UI
        this.scoreText = this.add.text(20, 20, "Score: " + this.score);
        this.timeSurvivedText = this.add.text(20, 40, "Time Survived: ");

        // Player
        this.player = this.physics.add.sprite(200, 850, 'player').setFrame(1).setScale(4);
        this.player.setCollideWorldBounds(true);

        // Animations
        this.anims.create({ key: 'left', frames: [{ key: 'player', frame: 0 }], frameRate: 20 });
        this.anims.create({ key: 'right', frames: [{ key: 'player', frame: 2 }], frameRate: 20 });
        this.anims.create({ key: 'center', frames: [{ key: 'player', frame: 1 }], frameRate: 20 });

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spacebar.on('down', () => this.shootProjectile(this.player));

        // Groups
        this.playerProjectiles = this.physics.add.group();
        this.enemyProjectiles = this.physics.add.group();
        this.meteors = this.physics.add.group();
        this.enemies = this.physics.add.group();

        // Events
        this.spawnRandomMeteorTimer();
        this.spawnRandomEnemy();

        // Collisions
        this.physics.add.collider(this.playerProjectiles, this.meteors, this.playerProjectileCollision, null, this);
        this.physics.add.collider(this.player, this.meteors, this.playerObstacleCollision, null, this);
        this.physics.add.collider(this.player, this.enemyProjectiles, this.playerObstacleCollision, null, this);
        this.physics.add.collider(this.playerProjectiles, this.enemies, this.playerProjectileEnemyCollision, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('center');
        }

        this.timeSurvived = this.time.now * 0.001;
        this.timeSurvivedText.setText("Time Survived: " + Math.round(this.timeSurvived));

        scrollBg();
    }

    shootProjectile(player) {
        let projectile = this.playerProjectiles.create(player.x, player.y, 'projectile').setFrame(7).setScale(4);
        projectile.setVelocity(0, -300);
        projectile.allowGravity = false;
        this.sound.play('shootSfx');
    }

    spawnMeteor() {
        const speed = Phaser.Math.Between(100, 300);
        let meteor = this.meteors.create(Phaser.Math.Between(0, 400), -200, 'misc')
            .setFrame(40).setScale(4);
        meteor.setVelocity(0, speed);
        meteor.allowGravity = false;
    }

    spawnRandomMeteorTimer() {
        this.spawnMeteor();
        this.time.delayedCall(Phaser.Math.Between(500, 700), () => this.spawnRandomMeteorTimer());
    }

    shootEnemyProjectiles(enemy) {
        let projectile = this.enemyProjectiles.create(enemy.x, enemy.y, 'projectile').setFrame(12).setScale(4);
        projectile.setVelocity(0, 300);
        projectile.allowGravity = false;
    }

    shootEnemyProjectilesLoop(enemy) {
        this.shootEnemyProjectiles(enemy);
        this.time.delayedCall(2000, () => this.shootEnemyProjectilesLoop(enemy));
    }

    spawnEnemy() {
        let enemy = this.enemies.create(Phaser.Math.Between(-200, 500), Phaser.Math.Between(0, 400), 'player')
            .setFrame(9).setScale(4);
        this.shootEnemyProjectilesLoop(enemy);
    }

    spawnRandomEnemy() {
        this.spawnEnemy();
        this.time.delayedCall(Phaser.Math.Between(1000, 1500), () => this.spawnRandomEnemy());
    }

    playerProjectileCollision(playerProjectile, meteor) {
        meteor.disableBody(true, true);
        playerProjectile.disableBody(true, true);
        this.sound.play('break1Sfx');
    }

    playerProjectileEnemyCollision(playerProjectile, enemy) {
        enemy.disableBody(true, true);
        playerProjectile.disableBody(true, true);
        this.sound.play('enemyHitSfx');

        this.score++;
        this.scoreText.setText("Score: " + this.score);
    }

    playerObstacleCollision(player, obstacle) {
        obstacle.disableBody(true, true);
        player.disableBody(true, true);
        this.sound.play('hitSfx');

        alert("You lose!");
        this.gameOverScene();
    }

    gameOverScene() {
        this.gameBgm.stop();
        this.scene.start('TitleScene');
    }
}
