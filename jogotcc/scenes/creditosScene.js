class creditosScene extends Phaser.Scene {
    constructor() {
        super("creditosScene");
    }

    create(data) {
        if (!this.registry.has("fontBase")) this.registry.set("fontBase", 20);
        if (!this.registry.has("tituloFont")) this.registry.set("tituloFont", "League Spartan");
        if (!this.registry.has("opcaoFont")) this.registry.set("opcaoFont", "Arial");

        this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
        this.bg3.setDisplaySize(this.scale.width, this.scale.height);

        const centerX = this.scale.width / 2;
        let centerY = this.scale.height / 2;

        const titulo = createText(this, centerX, 100, "Créditos", "titulo", { fontFamily: this.registry.get("tituloFont"), color: "#ffffff" }).setOrigin(0.5);

        const boxWidth = (this.scale.width * 0.75) - 60;
        const font = this.registry.get("opcaoFont");
        const textX = centerX;

        let y = 0;
        const texts = [];

        function addCreditLine(scene, text, extraSpace = 10) {
            const obj = createText(scene, textX, 0, text, "normal", {
                fontFamily: font,
                align: "center",
                wordWrap: { width: boxWidth - 60 }
            }).setOrigin(0.5, 0);
            texts.push({ obj, extraSpace });
        }

        // adiciona todos os textos normalmente
        addCreditLine(this, "Jogo desenvolvido no ano de 2025 como parte do Trabalho de Conclusão de Curso", 5);
        addCreditLine(this, "Curso Técnico Integrado em Informática para Internet – IFC - Campus Sombrio", 20);
        addCreditLine(this, "Concepção e Design: Pedro Henrique Colares Ramos da Rosa", 10);
        addCreditLine(this, "Protótipo e Roteiro das Perguntas: Pedro Henrique Colares Ramos da Rosa", 10);
        addCreditLine(this, "Programação e Implementação: Vitor Cordioli Sandrini", 20);
        addCreditLine(this, "Orientador: Prof. Vanderlei Freitas Júnior  &  Coorientador: Prof. André Morando", 0);

        let totalTextHeight = 0;
        texts.forEach(({ obj, extraSpace }) => {
            totalTextHeight += obj.height + extraSpace;
        });

        const boxHeight = totalTextHeight + 60; 
        const boxX = (centerX - boxWidth / 2);
        const topMargin = titulo.y + titulo.height - 40;
        const availableHeight = this.scale.height - topMargin - 40; 
        const boxY = Math.max(topMargin, topMargin + (availableHeight - boxHeight) / 2);
        const creditBox = this.add.graphics();
        creditBox.fillStyle(0xffffff, 0.9);
        creditBox.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 20);

        y = boxY + 30; 
        texts.forEach(({ obj, extraSpace }) => {
            obj.setY(y);
            y += obj.height + extraSpace;
            obj.setDepth(1); 
        });

        //BOTAO DE VOLTAR
        const backBtnX = 40;
        const backBtnY = 40;
        const backBtnWidth = 130;
        const backBtnHeight = 55;

        const backBtn = this.add.graphics();
        backBtn.fillStyle(0xffffff, 1);
        backBtn.fillRoundedRect(backBtnX, backBtnY, backBtnWidth, backBtnHeight, 10);

        backBtn.setInteractive(new Phaser.Geom.Rectangle(backBtnX, backBtnY, backBtnWidth, backBtnHeight), Phaser.Geom.Rectangle.Contains);
        backBtn.input.cursor = 'pointer';

        const backText = createText(this, backBtnX + backBtnWidth / 2, backBtnY + backBtnHeight / 2, "Voltar", "subtitulo", { fontFamily: this.registry.get("opcaoFont") }).setOrigin(0.5);

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
    }
}