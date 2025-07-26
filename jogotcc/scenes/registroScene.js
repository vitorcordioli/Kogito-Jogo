class registroScene extends Phaser.Scene {
    constructor() {
        super("registroScene");
    }

    create() {
        this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
        this.bg3.setDisplaySize(this.scale.width, this.scale.height);

        const headerWidth = 250;
        const headerHeight = 40;
        const headerX = this.scale.width / 2 - headerWidth / 2;
        const headerY = 20;

        const header = this.add.graphics();
        header.fillStyle(0xffffff, 1);
        header.fillRoundedRect(headerX, headerY, headerWidth, headerHeight, 20);

        this.add.text(this.scale.width / 2, headerY + headerHeight / 2, "Cadastro de Usuário", {
            font: "22px Arial",
            color: "#000000",
            fontStyle: "bold"
        }).setOrigin(0.5);

        const panelX = this.scale.width / 2 - 205;
        const panelY = 75;
        const panelWidth = 410;
        const panelHeight = 530;


        const panel = this.add.graphics();
        panel.fillStyle(0xffffff, 1);
        panel.fillRoundedRect(panelX, panelY, panelWidth, panelHeight, 20);

        const title = this.add.text(this.scale.width / 2, panelY + 50, "Kogito", {
            font: "68px 'League Spartan'",
            color: "#000000"
        }).setOrigin(0.5);


        this.emailInput = this.add.dom(this.scale.width / 2, panelY + 140).createFromHTML(`
             <label style="display: block; font-size: 18px; color: #000; margin-bottom: 3px; font-family: Arial;">Email:</label>
      <input id="email" type="email" placeholder="Digite seu email" style="
        width: 300px; 
        height: 35px; 
        font-size: 18px; 
        padding: 5px 10px; 
        border-radius: 6px; 
        border: 1px solid #ccc;
        background-color: #e6e6e6;
        outline: none;
      ">
    `);

        this.passwordInput = this.add.dom(this.scale.width / 2, panelY + 225).createFromHTML(`
            <label style="display: block; font-size: 18px; color: #000; margin-bottom: 3px; font-family: Arial;">Senha (mínimo 6 caracteres):</label>
      <input id="passwordField" type="password" placeholder="Digite sua senha" style="
        width: 300px; 
        height: 35px; 
        font-size: 18px; 
        padding: 5px 10px; 
        border-radius: 6px; 
        border: 1px solid #ccc;
        background-color: #e6e6e6;
        outline: none;
      ">
    `);

        this.showPasswordCheckbox = this.add.dom(this.scale.width / 2 + 90, panelY + 275).createFromHTML(`
  <label style="font-size: 15px; color: #000; cursor: pointer; user-select:none; font-family: Arial;">
    <input id="showPassword1" type="checkbox" style="margin-right: 3px;">
    Mostrar Senha
  </label>
`);

        this.confirmPasswordInput = this.add.dom(this.scale.width / 2, panelY + 330).createFromHTML(`
    <label style="display: block; font-size: 18px; color: #000; margin-bottom: 3px; font-family: Arial;">Confirme sua Senha:</label>
    <input id="confirmPasswordField" type="password" placeholder="Confirme sua senha" style="
      width: 300px;
      height: 35px;
      font-size: 18px;
      padding: 5px 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      background-color: #e6e6e6;
      outline: none;
    ">
`);

        this.showPasswordCheckbox2 = this.add.dom(this.scale.width / 2 + 90, panelY + 380).createFromHTML(`
  <label style="font-size: 15px; color: #000; cursor: pointer; user-select:none; font-family: Arial;">
    <input id="showPassword2" type="checkbox" style="margin-right: 3px;">
    Mostrar Senha
  </label>
`);


        const passwordInputNode = this.passwordInput.node.querySelector('input[type="password"]');
        const checkboxNode = this.showPasswordCheckbox.node.querySelector('#showPassword1');
        const confirmPasswordInputNode = this.confirmPasswordInput.node.querySelector('input[type="password"]');
        const checkboxNode2 = this.showPasswordCheckbox2.node.querySelector('#showPassword2');

        checkboxNode.addEventListener('change', (event) => {
            if (event.target.checked) {
                passwordInputNode.type = 'text';
            } else {
                passwordInputNode.type = 'password';
            }
        });

        checkboxNode2.addEventListener('change', (event) => {
            if (event.target.checked) {
                confirmPasswordInputNode.type = 'text';
            } else {
                confirmPasswordInputNode.type = 'password';
            }
        });

        const x = this.scale.width / 2;
        const y = panelY + 440;

        const bg = this.add.graphics();
        bg.fillStyle(0x00BF63, 1);
        bg.fillRoundedRect(x - 150, y - 30, 300, 60, 15);

        bg.setInteractive(
            new Phaser.Geom.Rectangle(x - 150, y - 30, 300, 60),
            Phaser.Geom.Rectangle.Contains
        );
        bg.input.cursor = 'pointer';

        const menuText = this.add.text(x, y, "Registrar", {
            font: "28px Arial",
            color: "#000000"
        }).setOrigin(0.5);

        menuText.setInteractive({ pixelPerfect: false });
        menuText.input.hitArea = bg.input.hitArea;

        bg.on("pointerup", () => {
            const email = this.emailInput.node.querySelector("input").value;
            const senha = this.passwordInput.node.querySelector("input").value;
            const confirmSenha = this.confirmPasswordInput.node.querySelector("input").value;

            if (senha !== confirmSenha) {
                alert("As senhas não coincidem!");
                return;
            }

            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert('Usuário registrado com sucesso!');

                        return fetch('http://localhost:3000/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, senha })
                        });
                    } else {
                        throw new Error(data.error || 'Erro ao registrar');
                    }
                })
                .then(res => res.json())
                .then(loginData => {
                    if (loginData.success) {
                        localStorage.setItem('token', loginData.token);

                        this.scene.start('menuScene', {
                            userId: loginData.user.id,
                            email: loginData.user.email,
                            fase: loginData.user.fase,
                            pontuacao: loginData.user.pontuacao
                        });
                    } else {
                        alert('Erro ao logar após o registro');
                    }
                })
                .catch(() => {
                    alert('Erro ao conectar com o servidor');
                });
        });

        bg.on("pointerover", () => {
            bg.clear();
            bg.fillStyle(0x009944, 1);
            bg.fillRoundedRect(x - 150, y - 30, 300, 60, 15);
        });

        bg.on("pointerout", () => {
            bg.clear();
            bg.fillStyle(0x00BF63, 1);
            bg.fillRoundedRect(x - 150, y - 30, 300, 60, 15);
        });

        const frase = this.add.text(x - 48, y + 50, "Já possui conta? ", {
            font: "18px Arial",
            color: "#000000"
        }).setOrigin(0.5, 0);

        const registreSe = this.add.text(x + 68, y + 50, "Clique aqui", {
            font: "18px Arial",
            color: "#007BFF",
            fontStyle: "bold"
        }).setOrigin(0.5, 0).setInteractive({ useHandCursor: true });

        registreSe.on("pointerover", () => {
            registreSe.setColor("#0056b3");
        });

        registreSe.on("pointerout", () => {
            registreSe.setColor("#007BFF");
        });

        registreSe.on("pointerup", () => {
            this.scene.start("loginScene");
        });

    }
};