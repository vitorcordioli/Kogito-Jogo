class opcoesScene extends Phaser.Scene {
    constructor() {
        super("opcoesScene");
        this.texts = [];
    }

    atualizarFontes() {
        const base = this.registry.get("fontBase") || 20;
        const styles = {
            titulo: 3.4,
            subtitulo: 1.4,
            normal: 1.2,
            pequeno: 1.0
        };

        const minBase = 14;
        const maxBase = 26;

        const safeBase = Math.max(minBase, Math.min(maxBase, base));

        this.texts.forEach(item => {
            if (!item.obj || !item.obj.scene) return;
            const novoTamanho = Math.round(safeBase * (styles[item.style] || 1));
            const font = item.font || (item.style === "titulo" ? "League Spartan" : "Arial");

            item.obj.setStyle({
                font: `${novoTamanho}px ${font}`,
                color: item.color || "#000000"
            });
        });
    };

    create(data) {
        if (!this.registry.has("fontBase")) this.registry.set("fontBase", 20);
        if (!this.registry.has("tituloFont")) this.registry.set("tituloFont", "League Spartan");
        if (!this.registry.has("opcaoFont")) this.registry.set("opcaoFont", "Arial");

        this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
        this.bg3.setDisplaySize(this.scale.width, this.scale.height);

        const centerX = this.scale.width / 2;
        let currentY = 100;

        const titulo = createText(this, centerX, currentY, "Opções", "titulo", { fontFamily: this.registry.get("tituloFont") }).setOrigin(0.5);
        this.texts.push({ obj: titulo, style: "titulo", font: this.registry.get("tituloFont"), color: "#ffffff" });

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

            const label = createText(this, centerX, y, option, "subtitulo", { fontFamily: this.registry.get("opcaoFont") }).setOrigin(0.5);
            this.texts.push({ obj: label, style: "subtitulo", font: this.registry.get("opcaoFont") });

            bg.on("pointerup", () => {
                if (option === "Aumentar a Fonte") {
                    let currentBase = this.registry.get("fontBase") || 20;
                    currentBase = Math.min(currentBase + 2, 26);
                    this.registry.set("fontBase", currentBase);
                    this.atualizarFontes();
                } else if (option === "Diminuir a Fonte") {
                    let currentBase = this.registry.get("fontBase") || 20;
                    currentBase = Math.max(currentBase - 2, 14);
                    this.registry.set("fontBase", currentBase);
                    this.atualizarFontes();
                } else if (option === "Sair da Conta") {
                    if (confirm("Tem certeza que deseja sair da conta?")) {
                        localStorage.removeItem('token');
                        this.registry.remove('userId');
                        this.registry.remove('email');
                        this.registry.remove('fase');
                        this.registry.remove('pontuacao');
                        this.registry.remove('perguntaIndex');
                        
                        this.scene.start('loginScene');
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
        this.texts.push({ obj: backText, style: "subtitulo", font: this.registry.get("opcaoFont") });

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

        this.time.delayedCall(0, () => {
            this.atualizarFontes();
        });
    }
}