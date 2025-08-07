const config = {
  type: Phaser.AUTO,
  width: Math.floor(window.innerWidth),
  height: Math.floor(window.innerHeight),
  parent: 'game-container',
  dom: {
    createContainer: true
  },
  scene: [carregarScene, menuScene, gameScene, pontuacaoScene, loginScene, registroScene, pauseScene]
};

const game = new Phaser.Game(config);
