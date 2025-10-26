class fimScene extends Phaser.Scene {
    constructor() {
        super("fimScene");
    }

    create(data) {
        if (!this.registry.has("fontBase")) this.registry.set("fontBase", 20);
        if (!this.registry.has("tituloFont")) this.registry.set("tituloFont", "League Spartan");
        if (!this.registry.has("opcaoFont")) this.registry.set("opcaoFont", "Arial");

        this.bg2 = this.add.image(0, 0, "bg2").setOrigin(0);
        this.bg2.setDisplaySize(this.scale.width, this.scale.height);

        this.userId = data.userId;
        this.score = data.score;
        this.atualPhase = data.atualPhase;

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            this.scene.start("loginScene");
            return;
        }

        fetch("http://localhost:3000/saveProgressWithQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                fase: 0,
                pontuacao: 0,
                perguntas_index: 0
            })
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) {
                    console.error("Erro ao apagar progresso automático:", response.error);
                }
            })
            .catch(err => {
                console.error("Erro na requisição automática:", err);
            });

        const centerX = this.scale.width / 2;
        let currentY = 80;

        createText(this, centerX, currentY, `Fim de Jogo!`, "fim", {
            fontFamily: this.registry.get("opcaoFont"),
            color: "#ffffff"
        }).setOrigin(0.5);

        currentY += 65;

        createText(this, centerX, currentY, `Obrigado por jogar!`, "subtitulo", {
            fontFamily: this.registry.get("opcaoFont"),
            color: "#ffffff"
        }).setOrigin(0.5);

        currentY += 100;

        this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRoundedRect(centerX - 220, currentY, 440, 140, 15);

        createText(this, centerX, currentY + 25, "Sua pontuação final:", "destaque", {
            fontFamily: this.registry.get("opcaoFont"),
            fontStyle: "bold"
        }).setOrigin(0.5);

        currentY += 80;

        const scoreBg = this.add.graphics();
        scoreBg.fillStyle(0xbcb7b7, 1);
        scoreBg.fillRoundedRect(centerX - 150, currentY, 300, 50, 25);

        createText(this, centerX, currentY + 25, this.score.toString(), "subtitulo", {
            fontFamily: this.registry.get("opcaoFont"),
            fontStyle: "bold"
        }).setOrigin(0.5);

        currentY += 170;

        const buttonY = currentY + 40;
        const buttonWidth = 320;
        const buttonHeight = 70;
        const buttonRadius = 15;

        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1);
        bg.fillRoundedRect(centerX - buttonWidth / 2, buttonY - buttonHeight / 2, buttonWidth, buttonHeight, buttonRadius);

        bg.setInteractive(
            new Phaser.Geom.Rectangle(centerX - buttonWidth / 2, buttonY - buttonHeight / 2, buttonWidth, buttonHeight),
            Phaser.Geom.Rectangle.Contains
        );
        bg.input.cursor = 'pointer';

        const menuText = createText(this, centerX, buttonY, "Menu", "subtitulo", {
            fontFamily: this.registry.get("opcaoFont"),
        }).setOrigin(0.5);

        bg.on("pointerup", () => {
            this.scene.start("menuScene");
        });

        bg.on("pointerover", () => {
            bg.clear();
            bg.fillStyle(0xd1c3c2, 1);
            bg.fillRoundedRect(centerX - buttonWidth / 2, buttonY - buttonHeight / 2, buttonWidth, buttonHeight, buttonRadius);
        });

        bg.on("pointerout", () => {
            bg.clear();
            bg.fillStyle(0xffffff, 1);
            bg.fillRoundedRect(centerX - buttonWidth / 2, buttonY - buttonHeight / 2, buttonWidth, buttonHeight, buttonRadius);
        });

    }
};
