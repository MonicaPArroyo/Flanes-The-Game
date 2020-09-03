function preload(){
    this.load.spritesheet('flan', 'assets/flan.png', { frameWidth: 88, frameHeight: 66 });
    this.load.spritesheet('skull', 'assets/skull.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('scarf', 'assets/scarf.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('smile', 'assets/smile.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('mobile', 'assets/mobile.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('violin', 'assets/violin.png', {frameWidth: 110, frameHeight: 178});
    this.load.spritesheet('hedgehog', 'assets/hedgehog.png', {frameWidth: 106, frameHeight: 101});
    this.load.image('apple', 'assets/apple.png')
    this.load.image('ground', 'assets/platform.png');
    
}

function create(){
    //background color
    bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x154360).setOrigin(0, 0);

    player = this.physics.add.sprite(100, 450, 'flan')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    platform = this.physics.add.staticGroup();
    platform.create(675, 575, 'ground')

    createAnimations();
    

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platform);

}

function createAnimations(){
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

function update(){
    if (cursors.left.isDown)
    {
        player.flipX = true;
        player.setVelocityX(-160);
        player.anims.play('run', true);
    }
    else if (cursors.right.isDown)
    {
        player.flipX = false;
        player.setVelocityX(160);
        player.anims.play('run', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('still', true);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.anims.play('jump', true);
        player.setVelocityY(-330);
    }
}



const config = {
        type: Phaser.AUTO,
        width: 500,
        height: 600,
        physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            enableBody: true,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config); 