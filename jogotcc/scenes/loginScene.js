class loginScene extends Phaser.Scene {
    constructor() {
        super("loginScene");
    }

    create() {
        this.bg3 = this.add.image(0, 0, "bg3").setOrigin(0);
        this.bg3.setDisplaySize(this.scale.width, this.scale.height);

        const panelX = this.scale.width / 2 - 200;
        const panelY = 80;
        const panelWidth = 400;
        const panelHeight = 360;


        const panel = this.add.graphics();
        panel.fillStyle(0xffffff, 1);
        panel.fillRoundedRect(panelX, panelY, panelWidth, panelHeight, 20);

        const title = this.add.text(this.scale.width / 2, panelY + 50, "Kogito", {
            font: "48px Arial",
            color: "#000000"
        }).setOrigin(0.5);

        this.emailInput = this.add.dom(this.scale.width / 2, panelY + 120).createFromHTML(`
      <input type="email" placeholder="Digite seu email" style="
        width: 280px; 
        height: 35px; 
        font-size: 18px; 
        padding: 5px 10px; 
        border-radius: 6px; 
        border: 1px solid #ccc;
        background-color: #e6e6e6;
        outline: none;
      ">
    `);

        this.passwordInput = this.add.dom(this.scale.width / 2, panelY + 180).createFromHTML(`
      <input type="password" placeholder="Digite sua senha" style="
        width: 280px; 
        height: 35px; 
        font-size: 18px; 
        padding: 5px 10px; 
        border-radius: 6px; 
        border: 1px solid #ccc;
        background-color: #e6e6e6;
        outline: none;
      ">
    `);

        const x = this.scale.width / 2;
        const y = panelY + 280;

        const bg = this.add.graphics();
        bg.fillStyle(0x00BF63, 1);
        bg.fillRoundedRect(x - 150, y - 30, 300, 60, 15);

        bg.setInteractive(
            new Phaser.Geom.Rectangle(x - 150, y - 30, 300, 60),
            Phaser.Geom.Rectangle.Contains
        );
        bg.input.cursor = 'pointer';

        const menuText = this.add.text(x, y, "Entrar", {
            font: "28px Arial",
            color: "#000000"
        }).setOrigin(0.5);

        menuText.setInteractive({ pixelPerfect: false });
        menuText.input.hitArea = bg.input.hitArea;

        bg.on("pointerup", () => {
            const email = this.emailInput.node.value;
            const senha = this.passwordInput.node.value;
            console.log("Email:", email);
            console.log("Senha:", senha);
            // Aqui você pode colocar a lógica de login
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

    }
};