class doctorWho extends Phaser.Scene {
  constructor() {
    super({ key: 'doctorWho' })
  }

  preload() {
    this.load.spritesheet('hedgehog', 'assets/sprites/hedgehog.png', {frameWidth: 106, frameHeight: 101});
  }

  create() {
    gameState.player = this.add.sprite(config.width / 2, config.height / 2, 'hedgehog');

    this.anims.create({
      key: 'sled',
      frames: this.anims.generateFrameNumbers('hedgehog'),
      frameRate: 10,
      repeat: -1
    })
  }

  update() {
    gameState.player.anims.play('sled', true);
  }
}