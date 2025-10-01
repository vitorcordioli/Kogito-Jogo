function createText(scene, x, y, content, styleName = "normal", extraConfig = {}) {
    const base = scene.registry.get("fontBase") || 20;

    const styles = {
        titulo: 3.4,     // 20 * 3.4 = ~68px
        pontuacao: 1.9, // 20 * 1.9 = ~38px
        destaque: 1.6,  // 20 * 1.6 = ~32px
        subtitulo: 1.4,  // 20 * 1.4 = ~28px
        normal: 1.2,     // 20 * 1.2 = ~24px
        pequeno: 1.0     // 20 * 1.0 = 20px
    };

    const fontSize = Math.round(base * (styles[styleName] || 1));
    const fontFamily = extraConfig.fontFamily || "Arial";
    const color = extraConfig.color || "#000000";

    return scene.add.text(x, y, content, {
        font: `${fontSize}px ${fontFamily}`,
        color: color,
        ...extraConfig
    });
};

const config = {
  type: Phaser.AUTO,
  width: Math.floor(window.innerWidth),
  height: Math.floor(window.innerHeight),
  parent: 'game-container',
  dom: {
    createContainer: true
  },
  scene: [carregarScene, menuScene, gameScene, pontuacaoScene, loginScene, registroScene, pauseScene, opcoesScene],
};

const game = new Phaser.Game(config);
