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
    this.load.image('bg1', 'assets/backgrounds/london.png');
    this.load.image('bg2', 'assets/backgrounds/clouds.png');
    this.load.image('bg3', 'assets/backgrounds/sky.png');
  }

  create() {
    gameState.active = true
    this.createParallaxBackgrounds();
    gameState.player = this.physics.add.sprite(100, 450, 'flan')
    gameState.player.setBounce(0.2);
    gameState.player.setCollideWorldBounds(true);

    const platform = this.physics.add.staticGroup();
    platform.create(675, 575, 'ground')

    this.createAnimations(); 

    this.cameras.main.setBounds(0, 0, gameState.bg3.width, gameState.bg3.height);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.bg3.height + gameState.player.height);

    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
    gameState.player.setCollideWorldBounds(true);

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
  
  createParallaxBackgrounds() {
    gameState.bg3 = this.add.image(0, 0, 'bg3');
    gameState.bg2 = this.add.image(0, 0, 'bg2');
    gameState.bg1 = this.add.image(0, 0, 'bg1');
    
    

    gameState.bg1.setOrigin(0, 0);
    gameState.bg2.setOrigin(0, 0);
    gameState.bg3.setOrigin(0, 0);

    const game_width = parseFloat(gameState.bg3.getBounds().width)
    gameState.width = game_width;
    const window_width = config.width

    const bg1_width = gameState.bg1.getBounds().width
    const bg2_width = gameState.bg2.getBounds().width
    const bg3_width = gameState.bg3.getBounds().width

    gameState.bg3 .setScrollFactor(0);
    gameState.bg1.setScrollFactor((bg1_width - window_width) / (game_width - window_width));
    gameState.bg2.setScrollFactor((bg2_width - window_width) / (game_width - window_width));
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









