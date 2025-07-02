class menuScene extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }

    create() {
        this.inicial = this.add.image(0, 0, "inicial").setOrigin(0);
        this.inicial.setDisplaySize(this.scale.width, this.scale.height);

        const title = this.add.text(this.scale.width / 2, 100, "Kogito", {
            font: "68px Arial",
            fill: "#ffffff"
        }).setOrigin(0.5);

        const menuOptions = ["Continuar jogo", "Novo jogo", "Opções", "Créditos"];
        menuOptions.forEach((option, index) => {
            const x = this.scale.width / 2;
            const y = 240 + index * 70;

            const bg = this.add.graphics();
            bg.fillStyle(0xffffff, 1);
            bg.fillRoundedRect(x - 150, y - 30, 300, 60, 15);

            bg.setInteractive(
                new Phaser.Geom.Rectangle(x - 150, y - 30, 300, 60),
                Phaser.Geom.Rectangle.Contains
            );

            bg.input.cursor = 'pointer';

            const menuText = this.add.text(x, y, option, {
                font: "28px Arial",
                color: "#000000"
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            menuText.setInteractive({ pixelPerfect: false });
            menuText.input.hitArea = bg.input.hitArea;

            bg.on("pointerup", () => {
                if (option === "Novo jogo") {
                    this.scene.start("gameScene"); 
                }
            });

            bg.on("pointerover", () => {
                bg.clear();
                bg.fillStyle(0xd1c3c2, 1);
                bg.fillRoundedRect(x - 150, y - 30, 300, 60, 15);
            });

            bg.on("pointerout", () => {
                bg.clear();
                bg.fillStyle(0xffffff, 1);
                bg.fillRoundedRect(x - 150, y - 30, 300, 60, 15);
            });
        });

    }
}
