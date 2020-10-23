class sherlock extends Phaser.Scene {
  constructor(){
    super({key: 'sherlock'})
    this.heights = [4, 7, 5, null, 5, 4, null, 4, 5];
  }

  preload() {
    this.load.spritesheet('flan', 'assets/sprites/flan.png', { frameWidth: 88, frameHeight: 66 });
    this.load.spritesheet('door', 'assets/sprites/door.png', { frameWidth: 78, frameHeight: 146 });
    this.load.spritesheet('skull', 'assets/sprites/skull.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('scarf', 'assets/sprites/scarf.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('smile', 'assets/sprites/smile.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('mobile', 'assets/sprites/mobile.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('violin', 'assets/sprites/violin.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('hedgehog', 'assets/sprites/hedgehog.png', {frameWidth: 106, frameHeight: 101});

    this.load.image('apple', 'assets/sprites/apple.png')
    this.load.image('p_platform', 'assets/principal_platform.png');
    this.load.image('platform', 'assets/platform.png');

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

    gameState.p_platform = this.physics.add.staticGroup();
    gameState.p_platform.create(1000, 587, 'p_platform')

    gameState.platforms = this.physics.add.staticGroup();

    this.createAnimations(); 
    this.createPoints();
    this.levelSetup();
    

    this.physics.add.collider(gameState.player, gameState.p_platform);
    this.physics.add.collider(gameState.player, gameState.platforms);
    this.physics.add.collider(gameState.goal, gameState.platforms);

    //Cameras
    this.cameras.main.setBounds(0, 0, gameState.bg3.width, gameState.bg3.height);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.bg3.height + gameState.player.height);

    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
    gameState.player.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();
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
        frameRate: 4,
        repeat: -1
    })

    this.anims.create({
        key: 'anim_scarf',
        frames: this.anims.generateFrameNumbers('scarf', { start: 0, end: 1 }),
        frameRate: 4,
        repeat: -1
    })

    this.anims.create({
        key: 'anim_smile',
        frames: this.anims.generateFrameNumbers('smile', { start: 0, end: 1 }),
        frameRate: 4,
        repeat: -1
    })

    this.anims.create({
        key: 'anim_mobile',
        frames: this.anims.generateFrameNumbers('mobile', { start: 0, end: 1 }),
        frameRate: 4,
        repeat: -1
    })

    this.anims.create({
        key: 'anim_violin',
        frames: this.anims.generateFrameNumbers('violin', { start: 0, end: 1 }),
        frameRate: 4,
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

  createPoints(){
    
    gameState.skull = this.physics.add.sprite(100, 200, 'skull');
    gameState.scarf = this.physics.add.sprite(600, 500, 'scarf');
    gameState.smile = this.physics.add.sprite(1050, 100, 'smile');
    gameState.mobile = this.physics.add.sprite(1300, 500, 'mobile');
    gameState.violin = this.physics.add.sprite(1900, 500, 'violin');

    gameState.skull.setScale(.5);
    gameState.scarf.setScale(.5);
    gameState.smile.setScale(.5);
    gameState.mobile.setScale(.5);
    gameState.violin.setScale(.5);


    this.physics.add.collider(gameState.skull, gameState.p_platform);
    this.physics.add.collider(gameState.scarf, gameState.p_platform);
    this.physics.add.collider(gameState.smile, gameState.p_platform);
    this.physics.add.collider(gameState.mobile, gameState.p_platform);
    this.physics.add.collider(gameState.violin, gameState.p_platform);

    this.physics.add.collider(gameState.skull, gameState.platforms);
    this.physics.add.collider(gameState.scarf, gameState.platforms);
    this.physics.add.collider(gameState.smile, gameState.platforms);
    this.physics.add.collider(gameState.mobile, gameState.platforms);
    this.physics.add.collider(gameState.violin, gameState.platforms);

    gameState.skull.anims.play('anim_skull', true);
    gameState.scarf.anims.play('anim_scarf', true);
    gameState.smile.anims.play('anim_smile', true);
    gameState.mobile.anims.play('anim_mobile', true);
    gameState.violin.anims.play('anim_violin', true);

    gameState.skull.move = this.tweens.add({
      targets: gameState.skull,
      x: gameState.skull.x - 50,
      ease: 'Linear',
      duration: 1500,
      repeat: -1,
      yoyo: true
    })

    gameState.scarf.move = this.tweens.add({
      targets: gameState.scarf,
      x: gameState.scarf.x - 50,
      ease: 'Linear',
      duration: 1500,
      repeat: -1,
      yoyo: true
    })

    gameState.smile.move = this.tweens.add({
      targets: gameState.smile,
      x: gameState.smile.x - 50,
      ease: 'Linear',
      duration: 1500,
      repeat: -1,
      yoyo: true
    })

    gameState.mobile.move = this.tweens.add({
      targets: gameState.mobile,
      x: gameState.mobile.x - 50,
      ease: 'Linear',
      duration: 1500,
      repeat: -1,
      yoyo: true
    })

    gameState.violin.move = this.tweens.add({
      targets: gameState.violin,
      x: gameState.violin.x - 50,
      ease: 'Linear',
      duration: 1500,
      repeat: -1,
      yoyo: true
    })
  }

  levelSetup() {
    for (const [xIndex, yIndex] of this.heights.entries()) {
      this.createPlatform(xIndex, yIndex);
    } 

    gameState.goal = this.physics.add.sprite(gameState.width - 80, 100, 'door');

    /*
    this.physics.add.overlap(gameState.player, gameState.goal, function() {
      this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
        if (progress > .9) {
          this.scene.stop(this.levelKey);
          this.scene.start(this.nextLevel[this.levelKey]);
        }
      });
    */
  }

  createPlatform(xIndex, yIndex) {
    // Creates a platform evenly spaced along the two indices.
    // If either is not a number it won't make a platform
      if (typeof yIndex === 'number' && typeof xIndex === 'number') {
        gameState.platforms.create((220 * xIndex),  yIndex * 70, 'platform').setOrigin(0, 0.5).refreshBody();
      }
  }

  

  update(){
    
    if(gameState.active){
      if (gameState.cursors.left.isDown){
          //gameState.player.flipX = true;
          gameState.player.setVelocityX(-160);
          gameState.player.anims.play('run', true);
      }
      else if (gameState.cursors.right.isDown){
          //gameState.player.flipX = false;
          gameState.player.setVelocityX(160);
          gameState.player.anims.play('run', true);
      }
      else{
          gameState.player.setVelocityX(0);
          gameState.player.anims.play('still', true);
      }

      if (gameState.cursors.up.isDown && gameState.player.body.touching.down){
          gameState.player.anims.play('jump', true);
          gameState.player.setVelocityY(-500);
      }
      /*

      if (gameState.player.y > gameState.bg3.height) {
        this.cameras.main.shake(240, .01, false, function(camera, progress) {
          if (progress > .9) {
            this.scene.restart(this.levelKey);
          }
        });
      }
    */
  }
}


}









