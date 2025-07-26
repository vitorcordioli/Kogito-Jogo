class menuScene extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init(data) {
        if (!localStorage.getItem('token')) {
            alert("Você precisa estar logado.");
            this.scene.start("loginScene"); 
            return;
        }


        this.userId = data.userId;
        this.email = data.email;
        this.fase = data.fase;
        this.pontuacao = data.pontuacao;
    }

    create() {
        this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
        this.bg3.setDisplaySize(this.scale.width, this.scale.height);

        const title = this.add.text(this.scale.width / 2, 100, "Kogito", {
            font: "68px 'League Spartan'",
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
                    if (this.fase > 0 || this.pontuacao > 0) {
                        if (confirm("Você já tem um jogo salvo. Começar um novo jogo apagará o progresso atual. Deseja continuar?")) {
                            fetch('http://localhost:3000/updateProgress', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                },
                                body: JSON.stringify({
                                    id: this.userId,
                                    fase: 0,
                                    pontuacao: 0
                                })
                            })
                                .then(res => res.json())
                                .then(() => {
                                    this.scene.start("gameScene", { atualPhase: 0, score: 0, userId: this.userId });
                                });
                        }
                    } else {
                        this.scene.start("gameScene", { atualPhase: 0, score: 0, userId: this.userId });
                    }
                }

                if (option === "Continuar jogo") {
                    if (this.fase > 0 || this.pontuacao > 0) {
                        this.scene.start("gameScene", {
                            atualPhase: this.fase,
                            score: this.pontuacao,
                            userId: this.userId
                        });
                    } else {
                        alert("Você ainda não tem progresso salvo.");
                    }
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
