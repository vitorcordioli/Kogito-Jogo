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
        this.questionIndex = data.questionIndex || 0;

        const centerX = this.scale.width / 2;
        let currentY = 100;

        this.add.text(centerX, currentY, "Jogo pausado", {
            font: "68px 'League Spartan'",
            fill: "#ffffff"
        }).setOrigin(0.5);

        currentY += 140;

        const options = ["Continuar", "Menu & Salvar", "Apagar Progresso"];
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
                    const token = localStorage.getItem("token");

                    if (!token) {
                        alert("Token não encontrado. Faça login novamente.");
                        this.scene.start("loginScene");
                        return;
                    }

                    console.log("Dados enviados:", {
                        fase: this.fase,
                        pontuacao: this.pontuacao,
                        perguntas_index: this.questionIndex
                    });


                    fetch("http://localhost:3000/saveProgressWithQuestion", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            id: this.userId,
                            fase: this.fase,
                            pontuacao: this.pontuacao,
                            perguntas_index: this.questionIndex
                        })
                    })
                        .then(res => res.json())
                        .then(response => {
                            if (response.success) {
                                alert("Progresso salvo com sucesso!");
                                this.scene.stop("gameScene");
                                this.scene.start("menuScene");
                            } else {
                                alert("Erro ao salvar progresso: " + (response.error || "Erro desconhecido"));
                            }
                        })
                        .catch(() => {
                            alert("Erro de conexão com o servidor.");
                        });
                } else if (option === "Apagar Progresso") {
                    const sair = confirm("Se continuar, todo seu progresso será apagado. Tem certeza que quer fazer isso?");
                    if (sair) {
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
                            .then(data => {
                                if (data.success) {
                                    this.scene.stop("gameScene");
                                    this.scene.start("menuScene", {
                                        userId: this.userId,
                                        fase: 0,
                                        score: 0,
                                        perguntaIndex: 0
                                    });
                                } else {
                                    alert("Erro ao zerar progresso: " + (data.error || "Erro desconhecido"));
                                    this.scene.stop("gameScene");
                                    this.scene.start("menuScene");
                                }
                            })
                            .catch(() => {
                                alert("Erro de conexão com o servidor.");
                                this.scene.stop("gameScene");
                                this.scene.start("menuScene");
                            });
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