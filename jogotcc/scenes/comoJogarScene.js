class comoJogarScene extends Phaser.Scene {
    constructor() {
        super("comoJogarScene");
    }

    preload() {
        this.load.image("comoJogar", "assets/comojogar.jpg");
    }

    create(data) {
        if (!this.registry.has("fontBase")) this.registry.set("fontBase", 20);
        if (!this.registry.has("tituloFont")) this.registry.set("tituloFont", "League Spartan");
        if (!this.registry.has("opcaoFont")) this.registry.set("opcaoFont", "Arial");

        this.cameras.main.setBackgroundColor('#028245');

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const titulo = createText(this, centerX, 90, "Como Jogar", "titulo", { fontFamily: this.registry.get("tituloFont"), color: "#ffffff" }).setOrigin(0.5);

        const tituloY = 100;
        const spacing = 50;

        const img = this.add.image(centerX, tituloY + spacing, "comoJogar");
        img.setOrigin(0.5, 0);

        const scale = (this.scale.width * 0.75) / img.width;
        img.setScale(scale);
        
        const imgWidth = img.displayWidth;
        const imgHeight = img.displayHeight;

        const maskShape = this.make.graphics({ x: 0, y: 0, add: false });
        maskShape.fillStyle(0xffffff);
        maskShape.fillRoundedRect(
            centerX - imgWidth / 2,
            tituloY + spacing,
            imgWidth,
            imgHeight,
            20 
        );
        const mask = maskShape.createGeometryMask();
        img.setMask(mask);

        const border = this.add.graphics();
        border.lineStyle(6, 0x000000);
        border.strokeRoundedRect(
            centerX - imgWidth / 2,
            tituloY + spacing,
            imgWidth,
            imgHeight,
            20 
        );

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
            this.scene.start("opcoesScene");
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
};