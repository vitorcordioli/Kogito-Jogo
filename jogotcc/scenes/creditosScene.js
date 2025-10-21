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

        const font = this.registry.get("opcaoFont");

        const baseBoxWidth = (this.scale.width * 0.75) - 60;
        const initialBoxX = centerX - baseBoxWidth / 2;
        const initialPadding = centerX - initialBoxX;

        const lines = [
            { text: "Jogo desenvolvido no ano de 2025 como parte do Trabalho de Conclusão de Curso", extra: 5 },
            { text: "Curso Técnico Integrado em Informática para Internet – IFC - Campus Sombrio", extra: 30 },
            { text: "Concepção e Design: Pedro Henrique Colares Ramos da Rosa", extra: 10 },
            { text: "Protótipo e Roteiro das Perguntas: Pedro Henrique Colares Ramos da Rosa", extra: 10 },
            { text: "Programação e Implementação: Vitor Cordioli Sandrini", extra: 30 },
            { text: "Orientador: Prof. Vanderlei Freitas Júnior  &  Coorientador: Prof. André Morando", extra: 0 }
        ];

        let maxTextWidth = 0;
        for (const l of lines) {
            const meas = createText(this, 0, 0, l.text, "normal", {
                fontFamily: font,
                align: "left"
            }).setOrigin(0.5, 0);
            if (meas.width > maxTextWidth) maxTextWidth = meas.width;
            meas.destroy();
        }

        const sidePadding = 50; 
        const dynamicWidth = Math.max(baseBoxWidth, maxTextWidth + sidePadding * 2);
        const boxWidth = dynamicWidth;
        const wrapWidth = boxWidth - sidePadding * 2;

        const texts = [];
        for (const l of lines) {
            const obj = createText(this, 0, 0, l.text, "normal", {
                fontFamily: font,
                align: "center",
                wordWrap: { width: wrapWidth }
            }).setOrigin(0.5, 0);
            texts.push({ obj, extraSpace: l.extra });
        }

        let totalTextHeight = 0;
        texts.forEach(({ obj, extraSpace }) => {
            totalTextHeight += obj.height + extraSpace;
        });

        const boxHeight = totalTextHeight + 60;
        const topMargin = titulo.y + titulo.height - 40;
        const availableHeight = this.scale.height - topMargin - 40;
        const boxY = Math.max(topMargin, topMargin + (availableHeight - boxHeight) / 2);
        const boxX = centerX - boxWidth / 2;
        const textX = boxX + initialPadding;

        const creditBox = this.add.graphics();
        creditBox.fillStyle(0xffffff, 0.9);
        creditBox.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 20);

        let y = boxY + 30;
        texts.forEach(({ obj, extraSpace }) => {
            obj.setPosition(centerX, y);
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