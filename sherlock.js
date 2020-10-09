class sherlock extends Phaser.Scene {
  constructor(){
    super({key: 'sherlock'})
  }

  preload() {
    this.load.spritesheet('flan', 'assets/sprites/flan.png', { frameWidth: 88, frameHeight: 66 });
    this.load.spritesheet('skull', 'assets/sprites/skull.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('scarf', 'assets/sprites/scarf.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('smile', 'assets/sprites/smile.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('mobile', 'assets/sprites/mobile.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('violin', 'assets/sprites/violin.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('hedgehog', 'assets/sprites/hedgehog.png', {frameWidth: 106, frameHeight: 101});
    this.load.image('apple', 'assets/sprites/apple.png')
    this.load.image('ground', 'assets/sprites/platform.png');

    //background
    this.load.image('bg1', 'assets/backgrounds/clouds.png');
    this.load.image('bg2', 'assets/backgrounds/london.png');
  }

  create() {
    gameState.active = true
    gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x00aabb).setOrigin(0, 0);
    gameState.player = this.physics.add.sprite(100, 450, 'flan')
    gameState.player.setBounce(0.2);
    gameState.player.setCollideWorldBounds(true);

    const platform = this.physics.add.staticGroup();
    platform.create(675, 575, 'ground')

    this.createAnimations(); 

    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(gameState.player, platform);
  }

  createAnimations() {
    //player's animation
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('flan', { start: 4, end: 9 }),
        frameRate: 8,
        repeat: -1
    });
  
    this.anims.create({
        key: 'still',
        frames: this.anims.generateFrameNumbers('flan', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
  
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('flan', { start: 2, end: 3 }),
        frameRate: 8,
        repeat: -1
    })

    //points
    this.anims.create({
        key: 'anim_skull',
        frames: this.anims.generateFrameNumbers('skull', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'anim_scarf',
        frames: this.anims.generateFrameNumbers('scarf', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'anim_smile',
        frames: this.anims.generateFrameNumbers('smile', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'anim_mobile',
        frames: this.anims.generateFrameNumbers('mobile', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'anim_violin',
        frames: this.anims.generateFrameNumbers('violin', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
    })

    //life
    this.anims.create({
        key: 'anim_hedgehog',
        frames: this.anims.generateFrameNumbers('hedgehog', { start: 0, end: 11 }),
        frameRate: 8,
        repeat: -1
    })

    //door to next level
    this.anims.create({
        key: 'door_opened',
        frames: this.anims.generateFrameNumbers('door', { start: 0, end: 7 }),
        frameRate: 8,
        repeat: 0
    })
  }

  update(){
    if (gameState.cursors.left.isDown)
    {
        gameState.player.flipX = true;
        gameState.player.setVelocityX(-160);
        gameState.player.anims.play('run', true);
    }
    else if (gameState.cursors.right.isDown)
    {
        gameState.player.flipX = false;
        gameState.player.setVelocityX(160);
        gameState.player.anims.play('run', true);
    }
    else
    {
        gameState.player.setVelocityX(0);
        gameState.player.anims.play('still', true);
    }

    if (gameState.cursors.up.isDown && gameState.player.body.touching.down)
    {
        gameState.player.anims.play('jump', true);
        gameState.player.setVelocityY(-330);
    }
}


}









