class gameScene extends Phaser.Scene {
    constructor() {
        super("gameScene");

        this.score = 0;
        this.atualPhase = 0;
    }

    preload() {
        this.load.image("pogona", "assets/pogona.jpg");
    }

    create(data) {
        this.userId = data.userId;
        this.atualPhase = data?.atualPhase || 0;
        this.score = data?.score || 0;
        this.currentQuestionIndex = data?.perguntaIndex || 0;

        this.availableBackgrounds = ["bg1", "bg2", "bg3"];
        this.questions = phases[this.atualPhase].questions;
        this.questionGroup = this.add.group();
        this.createPersistentButtons();

        this.showQuestion(this.currentQuestionIndex);

        document.getElementById("closeModal").onclick = function () {
            document.getElementById("explanationModal").style.display = 'none';
        };
    }

    createPersistentButtons() {
        const verExpWidth = 280;
        const verExpHeight = 60;
        const verExpX = 60;
        const verExpY = this.scale.height - 350;

        this.explanationBtnBg = this.add.graphics();
        this.explanationBtnBg.fillStyle(0xffffff, 1);
        this.explanationBtnBg.fillRoundedRect(verExpX, verExpY, verExpWidth, verExpHeight, 15);
        this.explanationBtnBg.setInteractive(new Phaser.Geom.Rectangle(verExpX, verExpY, verExpWidth, verExpHeight), Phaser.Geom.Rectangle.Contains);
        this.explanationBtnBg.input.cursor = 'pointer';
        this.explanationBtnBg.setVisible(false);

        this.explanationBtnText = this.add.text(verExpX + verExpWidth / 2, verExpY + verExpHeight / 2, "Ver Explicação", {
            font: "24px Arial",
            color: "#000000"
        }).setOrigin(0.5);
        this.explanationBtnText.setVisible(false);

        this.explanationBtnBg.on("pointerup", () => {
            const question = this.questions[this.currentQuestionIndex];
            this.showExplanation(question);
        });

        this.explanationBtnBg.on("pointerover", () => {
            this.explanationBtnBg.clear();
            this.explanationBtnBg.fillStyle(0xd1c3c2, 1);
            this.explanationBtnBg.fillRoundedRect(verExpX, verExpY, verExpWidth, verExpHeight, 15);
        });

        this.explanationBtnBg.on("pointerout", () => {
            this.explanationBtnBg.clear();
            this.explanationBtnBg.fillStyle(0xffffff, 1);
            this.explanationBtnBg.fillRoundedRect(verExpX, verExpY, verExpWidth, verExpHeight, 15);
        });

        // Próxima pergunta
        const nextWidth = 280;
        const nextHeight = 60;
        const nextX = this.scale.width - nextWidth - 60;
        const nextY = this.scale.height - 350;

        this.nextBtnBg = this.add.graphics();
        this.nextBtnBg.fillStyle(0xffffff, 1);
        this.nextBtnBg.fillRoundedRect(nextX, nextY, nextWidth, nextHeight, 15);
        this.nextBtnBg.setInteractive(new Phaser.Geom.Rectangle(nextX, nextY, nextWidth, nextHeight), Phaser.Geom.Rectangle.Contains);
        this.nextBtnBg.input.cursor = 'pointer';
        this.nextBtnBg.setVisible(false);

        this.nextBtnText = this.add.text(nextX + nextWidth / 2, nextY + nextHeight / 2, "Próxima Pergunta", {
            font: "24px Arial",
            color: "#000000"
        }).setOrigin(0.5);
        this.nextBtnText.setVisible(false);

        this.nextBtnBg.on("pointerup", () => this.nextQuestion());

        this.nextBtnBg.on("pointerover", () => {
            this.nextBtnBg.clear();
            this.nextBtnBg.fillStyle(0xd1c3c2, 1);
            this.nextBtnBg.fillRoundedRect(nextX, nextY, nextWidth, nextHeight, 15);
        });

        this.nextBtnBg.on("pointerout", () => {
            this.nextBtnBg.clear();
            this.nextBtnBg.fillStyle(0xffffff, 1);
            this.nextBtnBg.fillRoundedRect(nextX, nextY, nextWidth, nextHeight, 15);
        });
    }

    showQuestion(index) {
        const question = this.questions[index];

        if (!question) {
            console.warn("Pergunta não encontrada no índice:", index);
            this.scene.start("menuScene");
            return;
        }

        if (this.currentBackground) {
            this.currentBackground.destroy();
        }

        const backgroundKey = Phaser.Utils.Array.GetRandom(this.availableBackgrounds);

        this.currentBackground = this.add.image(0, 0, backgroundKey).setOrigin(0);
        this.currentBackground.setDisplaySize(this.scale.width, this.scale.height);
        this.children.bringToTop(this.questionGroup);

        this.questionGroup.clear(true, true);

        const centerX = this.scale.width / 2;

        const questionText = this.add.text(centerX, 50, question.text, {
            font: "32px Arial",
            fill: "#ffffff",
            wordWrap: { width: this.scale.width - 40 }
        }).setOrigin(0.5);

        this.questionGroup.add(questionText);

        if (question.imageKey) {
            const questionImage = this.add.image(centerX, 230, question.imageKey).setOrigin(0.5);
            questionImage.setDisplaySize(450, 270);
            this.questionGroup.add(questionImage);
        }


        question.answers.forEach((answer, i) => {
            const btnWidth = 280;
            const btnHeight = 60;
            const spacingX = 40;
            const spacingY = 30;

            const startX = centerX - btnWidth - spacingX / 2;
            const startY = 450;

            const row = Math.floor(i / 2);
            const col = i % 2;

            const btnX = startX + col * (btnWidth + spacingX);
            const btnY = startY + row * (btnHeight + spacingY);

            const btnBg = this.add.graphics();
            btnBg.fillStyle(0xffffff, 1);
            btnBg.fillRoundedRect(btnX, btnY, btnWidth, btnHeight, 15);
            btnBg.setInteractive(new Phaser.Geom.Rectangle(btnX, btnY, btnWidth, btnHeight), Phaser.Geom.Rectangle.Contains);
            btnBg.input.cursor = 'pointer';

            const btnText = this.add.text(btnX + btnWidth / 2, btnY + btnHeight / 2, answer.text, {
                font: "24px Arial",
                color: "#000000"
            }).setOrigin(0.5);

            this.questionGroup.addMultiple([btnBg, btnText]);

            btnBg.on("pointerup", () => {
                if (answer.correct) {
                    this.score += 10;
                    this.showCorrectAnswer(btnBg);
                } else {
                    this.showWrongAnswer(btnBg);
                }
            });

            btnBg.on("pointerover", () => {
                btnBg.clear();
                btnBg.fillStyle(0xd1c3c2, 1);
                btnBg.fillRoundedRect(btnX, btnY, btnWidth, btnHeight, 15);
            });

            btnBg.on("pointerout", () => {
                btnBg.clear();
                btnBg.fillStyle(0xffffff, 1);
                btnBg.fillRoundedRect(btnX, btnY, btnWidth, btnHeight, 15);
            });
        });

        //BOTÃO DE PAUSE

        const pauseBtnX = this.scale.width - 90;
        const pauseBtnY = 40;
        const pauseBtnWidth = 50;
        const pauseBtnHeight = 50;

        const pauseBtn = this.add.graphics();
        pauseBtn.fillStyle(0xffffff, 1);
        pauseBtn.fillRoundedRect(pauseBtnX, pauseBtnY, pauseBtnWidth, pauseBtnHeight, 10);
        pauseBtn.setInteractive(new Phaser.Geom.Rectangle(pauseBtnX, pauseBtnY, pauseBtnWidth, pauseBtnHeight), Phaser.Geom.Rectangle.Contains);
        pauseBtn.input.cursor = 'pointer';

        const barWidth = 6;
        const barHeight = 20;
        const barSpacing = 8;

        const barY = pauseBtnY + (pauseBtnHeight - barHeight) / 2;
        const bar1X = pauseBtnX + (pauseBtnWidth - barWidth * 2 - barSpacing) / 2;
        const bar2X = bar1X + barWidth + barSpacing;

        const pauseBar1 = this.add.rectangle(bar1X, barY, barWidth, barHeight, 0x000000).setOrigin(0, 0);
        const pauseBar2 = this.add.rectangle(bar2X, barY, barWidth, barHeight, 0x000000).setOrigin(0, 0);

        // === Eventos de hover ===
        pauseBtn.on("pointerover", () => {
            pauseBtn.clear();
            pauseBtn.fillStyle(0xd1c3c2, 1);
            pauseBtn.fillRoundedRect(pauseBtnX, pauseBtnY, pauseBtnWidth, pauseBtnHeight, 10);

            // traz as barrinhas pra frente
            this.children.bringToTop(pauseBar1);
            this.children.bringToTop(pauseBar2);
        });

        pauseBtn.on("pointerout", () => {
            pauseBtn.clear();
            pauseBtn.fillStyle(0xffffff, 1);
            pauseBtn.fillRoundedRect(pauseBtnX, pauseBtnY, pauseBtnWidth, pauseBtnHeight, 10);

            this.children.bringToTop(pauseBar1);
            this.children.bringToTop(pauseBar2);
        });

        pauseBtn.on("pointerup", () => {
            this.scene.pause();
            this.scene.launch("pauseScene", {
                score: this.score,
                fase: this.atualPhase,
                userId: this.userId,
                questionIndex: this.currentQuestionIndex
            });
        });
        this.children.bringToTop(this.explanationBtnBg);
        this.children.bringToTop(this.explanationBtnText);
        this.children.bringToTop(this.nextBtnBg);
        this.children.bringToTop(this.nextBtnText);
    }

    showExplanation(question) {
        const modal = document.getElementById('explanationModal');
        const explanationText = document.getElementById('explanationText');
        const videoLink = document.getElementById('videoLink');
        const closeBtn = document.getElementById('closeModal');

        explanationText.textContent = `Explicação: ${question.explanation}`;

        if (question.videoUrl) {
            videoLink.href = question.videoUrl;
            videoLink.style.display = 'inline';
        } else {
            videoLink.style.display = 'none';
        }

        modal.style.display = 'flex';

        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };
    }

    showCorrectAnswer(btnBg) {
        btnBg.clear();
        btnBg.fillStyle(0x81CD24, 1);
        btnBg.fillRoundedRect(btnBg.input.hitArea.x, btnBg.input.hitArea.y, 280, 60, 15);

        this.questionGroup.getChildren().forEach(child => {
            if (child.input) {
                child.disableInteractive();
            }
        });

        this.explanationBtnBg.setVisible(true);
        this.explanationBtnText.setVisible(true);
        this.nextBtnText.setVisible(true);
        this.nextBtnBg.setVisible(true);
    }

    showWrongAnswer(btnBg) {
        btnBg.clear();
        btnBg.fillStyle(0xD14224, 1);
        btnBg.fillRoundedRect(btnBg.input.hitArea.x, btnBg.input.hitArea.y, 280, 60, 15);

        const correctIndex = this.questions[this.currentQuestionIndex].answers.findIndex(a => a.correct);
        const graphicsList = this.questionGroup.getChildren().filter(c => c instanceof Phaser.GameObjects.Graphics);
        const correctBtnBg = graphicsList[correctIndex];

        correctBtnBg.clear();
        correctBtnBg.fillStyle(0x81CD24, 1);
        correctBtnBg.fillRoundedRect(correctBtnBg.input.hitArea.x, correctBtnBg.input.hitArea.y, 280, 60, 15);

        this.questionGroup.getChildren().forEach(child => {
            if (child.input) {
                child.disableInteractive();
            }
        });

        this.explanationBtnBg.setVisible(true);
        this.explanationBtnText.setVisible(true);
        this.nextBtnText.setVisible(true);
        this.nextBtnBg.setVisible(true);
    }

    nextQuestion() {
        this.currentQuestionIndex++;

        this.explanationBtnBg.setVisible(false);
        this.explanationBtnText.setVisible(false);
        this.nextBtnBg.setVisible(false);
        this.nextBtnText.setVisible(false);

        fetch("http://localhost:3000/saveProgressWithQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: this.userId,
                fase: this.atualPhase,
                pontuacao: this.score,
                perguntas_index: this.currentQuestionIndex
            })
        });

        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion(this.currentQuestionIndex);
        } else {
            this.atualPhase++;

            if (this.atualPhase < phases.length) {
                fetch("http://localhost:3000/saveProgressWithQuestion", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        id: this.userId,
                        fase: this.atualPhase,
                        pontuacao: this.score,
                        perguntas_index: 0
                    })
                }).then(() => {
                    this.scene.start("pontuacaoScene", {
                        score: this.score,
                        atualPhase: this.atualPhase - 1,
                        userId: this.userId,
                        perguntaIndex: 0
                    });
                }).catch(err => {
                    console.error("Erro ao resetar índice no backend:", err);
                    this.scene.start("pontuacaoScene", {
                        score: this.score,
                        atualPhase: this.atualPhase - 1,
                        userId: this.userId,
                        perguntaIndex: 0
                    });
                });
            } else {
                console.log("Fim do jogo!");
                //INCOMPLETO
            }
        }
    }
}
