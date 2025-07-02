class carregarScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("inicial", "assets/inicial.png");
    this.load.image("pergunta1", "assets/pergunta1.png")
    this.load.image("pergunta2", "assets/pergunta2.png")
  }

  create() {
    this.inicial = this.add.image(0, 0, "inicial").setOrigin(0);
    this.inicial.setDisplaySize(this.scale.width, this.scale.height);
  
    this.scene.start("mainMenu");
  }

  
}
