class gameScene extends Phaser.Scene {
    constructor() {
        super("gameScene");

        this.score = 0;
        this.atualPhase = 0;
        this.currentQuestionIndex = 0;
    }

    preload() {
        this.load.image("pogona", "assets/pogona.jpg");
    }

    create(data) {
        this.userId = data.userId;
        this.atualPhase = data?.atualPhase || 0;
        this.score = data?.score || 0;
        this.currentQuestionIndex = 0;

        this.availableBackgrounds = ["bg1", "bg2", "bg3"];
        this.questions = Phaser.Utils.Array.Shuffle(phases[this.atualPhase].questions);
        this.questions.forEach(q => {
        q.backgroundKey = Phaser.Utils.Array.GetRandom(this.availableBackgrounds);
    });
        this.questionGroup = this.add.group();
        this.showQuestion(this.currentQuestionIndex);
    }

    showQuestion(index) {
        const question = this.questions[index];

        if (this.currentBackground) {
            this.currentBackground.destroy();
        }

        this.currentBackground = this.add.image(0, 0, question.backgroundKey).setOrigin(0);
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
            questionImage.setDisplaySize(400, 250);
            this.questionGroup.add(questionImage);
        }


        question.answers.forEach((answer, i) => {
            const btnWidth = 280;
            const btnHeight = 60;
            const spacingX = 40;
            const spacingY = 30;

            const startX = centerX - btnWidth - spacingX / 2;
            const startY = 410;

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
                atualPhase: this.atualPhase,
                userId: this.userId,
            });
        });
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

        this.time.delayedCall(1000, () => {
            this.nextQuestion();
        });
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

        this.time.delayedCall(1000, () => {
            this.nextQuestion();
        });
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion(this.currentQuestionIndex);
        } else {
            this.atualPhase++;

            if (this.atualPhase < phases.length) {
                this.scene.start("pontuacaoScene", {
                    score: this.score,
                    atualPhase: this.atualPhase - 1,
                    userId: this.userId
                });
            } else {
                console.log("Fim do jogo!");
                //INCOMPLETO
            }
        }
    }
}
