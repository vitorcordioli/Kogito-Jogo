const config = {
  type: Phaser.AUTO,
  width: Math.floor(window.innerWidth),
  height: Math.floor(window.innerHeight),
  parent: 'game-container',
  dom: {
    createContainer: true
  },
  scene: [carregarScene, menuScene, gameScene, pontuacaoScene, loginScene]
};

const game = new Phaser.Game(config);
