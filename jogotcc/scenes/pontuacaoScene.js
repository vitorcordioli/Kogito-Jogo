class pontuacaoScene extends Phaser.Scene {
  constructor() {
    super("pontuacaoScene");
  }

  create(data) {
    this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
    this.bg3.setDisplaySize(this.scale.width, this.scale.height);

    const centerX = this.scale.width / 2;
    let currentY = 100;

    this.score = data.score;
    this.atualPhase = data.atualPhase;

    this.add.text(centerX, currentY, `Você concluiu a fase ${this.atualPhase + 1}!`, {
      font: "38px Arial",
      fill: "#ffffff"
    }).setOrigin(0.5);

    currentY += 120;

    this.add.graphics()
      .fillStyle(0xdddddd, 1)
      .fillRoundedRect(centerX - 220, currentY - 30, 440, 140, 30);

    this.add.text(centerX, currentY, "Pontuação final:", {
      font: "34px Arial",
      color: "#000000",
      fontStyle: "bold"
    }).setOrigin(0.5);

    currentY += 40;

    const scoreBg = this.add.graphics();
    scoreBg.fillStyle(0xbcb7b7, 1);
    scoreBg.fillRoundedRect(centerX - 150, currentY, 300, 50, 25);

    this.add.text(centerX, currentY + 25, this.score.toString(), {
      font: "30px Arial",
      color: "#000000",
      fontStyle: "bold"
    }).setOrigin(0.5);

    currentY += 170;


    //BOTOES
    const options = ["Continuar", "Menu"];
    const spacing = 70;

    options.forEach((option, index) => {
      const y = currentY + index * spacing;

      const bg = this.add.graphics();
      bg.fillStyle(0xffffff, 1);
      bg.fillRoundedRect(centerX - 150, y - 30, 300, 60, 15);

      bg.setInteractive(
        new Phaser.Geom.Rectangle(centerX - 150, y - 30, 300, 60),
        Phaser.Geom.Rectangle.Contains
      );
      bg.input.cursor = 'pointer';

      const scoreText = this.add.text(centerX, y, option, {
        font: "28px Arial",
        color: "#000000"
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      scoreText.setInteractive({ pixelPerfect: false });
      scoreText.input.hitArea = bg.input.hitArea;

      bg.on("pointerup", () => {
        if (option === "Continuar") {
          this.scene.start("gameScene", {
            atualPhase: this.atualPhase + 1,
            score: this.score
          });
        } else if (option === "Menu") {
          this.scene.start("menuScene");
        }
      });

      bg.on("pointerover", () => {
        bg.clear();
        bg.fillStyle(0xd1c3c2, 1);
        bg.fillRoundedRect(centerX - 150, y - 30, 300, 60, 15);
      });

      bg.on("pointerout", () => {
        bg.clear();
        bg.fillStyle(0xffffff, 1);
        bg.fillRoundedRect(centerX - 150, y - 30, 300, 60, 15);
      });

    });
  }
}
