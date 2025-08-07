class pauseScene extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }

    create(data) {
        this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
        this.bg3.setDisplaySize(this.scale.width, this.scale.height);

        this.userId = data.userId;
        this.fase = data.fase;
        this.pontuacao = data.score;

        const centerX = this.scale.width / 2;
        let currentY = 100;

        this.add.text(centerX, currentY, "Jogo pausado", {
            font: "38px Arial",
            fill: "#ffffff"
        }).setOrigin(0.5);

        currentY += 100;

        const options = ["Continuar", "Menu & Salvar", "Menu sem salvar"];
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

            const label = this.add.text(centerX, y, option, {
                font: "28px Arial",
                color: "#000000"
            }).setOrigin(0.5);

            bg.on("pointerup", () => {
                if (option === "Continuar") {
                    this.scene.resume("gameScene");
                    this.scene.stop();
                } else if (option === "Menu & Salvar") {

                } else if (option === "Menu sem salvar") {
                    const sair = confirm("Você sairá sem salvar o progresso. Deseja continuar?");
                    if (sair) {
                        this.scene.stop("gameScene");
                        this.scene.start("menuScene");
                    }
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