class carregarScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("bg3", "assets/bg3.png");
    this.load.image("bg1", "assets/bg1.png")
    this.load.image("bg2", "assets/bg2.png")
  }

  create() {
    this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
    this.bg3.setDisplaySize(this.scale.width, this.scale.height);
  
    this.scene.start("menuScene");
  }

  
}
