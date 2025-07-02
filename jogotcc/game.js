const config = {
  type: Phaser.AUTO,
  width: Math.floor(window.innerWidth),
  height: Math.floor(window.innerHeight),
  scene: [carregarScene, menuScene, gameScene]
};

const game = new Phaser.Game(config);
