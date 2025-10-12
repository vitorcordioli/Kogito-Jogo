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
        this.score = data.score;
        this.perguntaIndex = data.perguntaIndex;
    }

    create() {
        if (!this.registry.has("fontBase")) this.registry.set("fontBase", 20);
        if (!this.registry.has("tituloFont")) this.registry.set("tituloFont", "League Spartan");
        if (!this.registry.has("opcaoFont")) this.registry.set("opcaoFont", "Arial");


        this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
        this.bg3.setDisplaySize(this.scale.width, this.scale.height);

        const title = createText(this, this.scale.width / 2, 100, "Kogito", "titulo", {
            fontFamily: this.registry.get("tituloFont"),
            color: "#ffffff"
        }).setOrigin(0.5);

        fetch("http://localhost:3000/getProgressWithQuestions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.fase = data.fase || 0;
                    this.score = data.pontuacao || 0;
                    this.perguntaIndex = data.perguntas_index || 0;
                    this.userId = data.userId;
                    this.criarMenu();
                } else {
                    alert("Erro ao carregar progresso: " + (data.error || "Erro desconhecido"));
                    this.criarMenu();
                }
            })
            .catch(() => {
                alert("Erro de conexão com o servidor.");
                this.criarMenu();
            });
    }

    criarMenu() {
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

            const menuText = createText(this, x, y, option, "subtitulo", {
                fontFamily: this.registry.get("opcaoFont"),
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            menuText.setInteractive({ pixelPerfect: false });
            menuText.input.hitArea = bg.input.hitArea;

            bg.on("pointerup", () => {

                if (option === "Novo jogo") {
                    if (this.fase > 0 || this.score > 0) {
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
                                    pontuacao: 0,
                                    perguntas_index: 0
                                })
                            })
                                .then(res => res.json())
                                .then(() => {
                                    this.scene.start("gameScene", { atualPhase: 0, score: 0, userId: this.userId, perguntaIndex: 0 });
                                });
                        }
                    } else {
                        this.scene.start("gameScene", { atualPhase: 0, score: 0, userId: this.userId, perguntaIndex: 0 });
                    }
                }

                if (option === "Continuar jogo") {
                    if (this.fase > 0 || this.score > 0) {
                        this.scene.start("gameScene", {
                            atualPhase: this.fase,
                            score: this.score,
                            userId: this.userId,
                            perguntaIndex: this.perguntaIndex
                        });
                    } else {
                        alert("Você ainda não tem progresso salvo.");
                    }
                }

                if (option === "Opções") {
                    this.scene.start("opcoesScene", {
                    });
                }

                if (option === "Créditos") {
                    this.scene.start("creditosScene", {
                    });
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
