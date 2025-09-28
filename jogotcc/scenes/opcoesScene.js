class opcoesScene extends Phaser.Scene {
    constructor() {
        super("opcoesScene");
    }

    create(data) {
        this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
        this.bg3.setDisplaySize(this.scale.width, this.scale.height);

        const centerX = this.scale.width / 2;
        let currentY = 100;

        this.add.text(centerX, currentY, "Opções", {
            font: "68px 'League Spartan'",
            fill: "#ffffff"
        }).setOrigin(0.5);

        currentY += 140;

        const options = ["Como Jogar", "Aumentar a Fonte", "Diminuir a Fonte", "Sair da Conta"];
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

            const backBtnX = 40;
            const backBtnY = 40;
            const backBtnWidth = 130;
            const backBtnHeight = 55;

            const backBtn = this.add.graphics();
            backBtn.fillStyle(0xffffff, 1);
            backBtn.fillRoundedRect(backBtnX, backBtnY, backBtnWidth, backBtnHeight, 10);

            backBtn.setInteractive(new Phaser.Geom.Rectangle(backBtnX, backBtnY, backBtnWidth, backBtnHeight), Phaser.Geom.Rectangle.Contains);
            backBtn.input.cursor = 'pointer';

            const backText = this.add.text(
                backBtnX + backBtnWidth / 2,
                backBtnY + backBtnHeight / 2,
                "Voltar",
                { fontSize: "26px", color: "#000", fontFamily: "Arial" }
            );
            backText.setOrigin(0.5);

            backBtn.on("pointerup", () => {
                this.scene.start("menuScene");
            });

            backBtn.on("pointerover", () => {
                backBtn.clear();
                backBtn.fillStyle(0xd1c3c2, 1);
                backBtn.fillRoundedRect(backBtnX, backBtnY, backBtnWidth, backBtnHeight, 10);
            });

            backBtn.on("pointerout", () => {
                backBtn.clear();
                backBtn.fillStyle(0xffffff, 1);
                backBtn.fillRoundedRect(backBtnX, backBtnY, backBtnWidth, backBtnHeight, 10);
            });

        })
    }
}