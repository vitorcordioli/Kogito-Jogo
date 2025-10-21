const phases = [
  {
    name: "Phase 1",
    questions: [
      {
        text: "O que é PROGRAMAR?",
        imageKey: null,
        answers: [
          { text: "Jogar games no computador", imageKey: null, correct: false },
          { text: "Dar ordens para o computador resolver problemas", imageKey: null, correct: true },
          { text: "Consertar computadores quebrados", imageKey: null, correct: false },
          { text: "Digitar textos muito rápido", imageKey: null, correct: false },
        ],
        explanation: "Programar é dar comandos fáceis ao computador. Você diz: Faça isso, depois isso. Assim, o computador resolve problemas sozinho. Como contar frutas ou arrumar uma lista. Não é jogar, nem arrumar computador quebrado, nem digitar muito rápido.",
        videoUrl: "https://youtu.be/SlVBtXJXbbw",
      },
      {
        text: "Como resolver um problema GRANDE e DIFÍCIL?",
        imageKey: null,
        answers: [
          { text: "Procurar alguém para resolver para você", imageKey: null, correct: false },
          { text: "Esperar o problema desaparecer sozinho", imageKey: null, correct: false },
          { text: "Dividir os problemas em pequenos e fáceis", imageKey: null, correct: true },
          { text: "Usar um computador mais moderno ", imageKey: null, correct: false },
        ],
        explanation: "Um problema grande é como uma montanha alta. Você não sobe tudo de uma vez. Corte em partes pequenas, como degraus. Resolva um degrau por vez. Ficará mais fácil.",
        videoUrl: "https://youtu.be/GJUH7ivlpo4",
      },
      {
        text: "O que é LÓGICA na programação?",
        imageKey: null,
        answers: [
          { text: "Ter um pensamento claro e organizado", imageKey: null, correct: true },
          { text: "Saber resolver problemas matemáticos", imageKey: null, correct: false },
          { text: "Digitar códigos rapidamente", imageKey: null, correct: false },
          { text: "Falar inglês fluentemente", imageKey: null, correct: false },
        ],
        explanation: "Lógica é pensar de maneira objetiva e organizada. Como fazer um sanduíche: pão primeiro, depois recheio, depois outro pão. Passo a passo, sem bagunça. Não é só matemática. Não é digitar rápido.",
        videoUrl: "https://www.youtube.com/watch?v=FXKD75v7zDk",
      },
      {
        text: " Qual a relação entre LÓGICA e o ALGORITMO?",
        imageKey: null,
        answers: [
          { text: "São a mesma coisa", imageKey: null, correct: false },
          { text: " A linguagem vem antes da lógica ", imageKey: null, correct: false },
          { text: " A linguagem é mais importante que a lógica", imageKey: null, correct: false },
          { text: "Primeiro pensamos na solução, depois digitamos", imageKey: null, correct: true },
        ],
        explanation: "Primeiro, use lógica: pense no plano, como vou fazer assim. É o cérebro trabalhando. Depois, use a linguagem: escreva o plano no computador, como uma receita escrita. Lógica vem antes. É mais importante. Não são a mesma coisa.",
        videoUrl: "https://www.youtube.com/watch?v=sxt_3lcu3Hs",
      },
      {
        text: " Para que usamos a programação?",
        imageKey: null,
        answers: [
          { text: "Para criar jogos e aplicativos que resolvem problemas", imageKey: null, correct: true },
          { text: "Para desenhar no computador", imageKey: null, correct: false },
          { text: " Para usar o teclado mais rápido", imageKey: null, correct: false },
          { text: "  Para conectar a internet", imageKey: null, correct: false },
        ],
        explanation: "Programação faz jogos ou  até apps que ajudam, como lembrar o que comprar no mercado. Resolve problemas do dia a dia.",
        videoUrl: "https://www.youtube.com/watch?v=Y6WLCPD3YPU",
      },
    ]
  },
  {
    name: "Phase 2",
    questions: [
      {
        text: "Qual será o resultado da soma das formas geométricas?",
        imageKey: "fase21",
        answers: [
          { text: null, imageKey: "fasea1", correct: true },
          { text: null, imageKey: "fasea2", correct: false },
          { text: null, imageKey: "fasea3", correct: false },
          { text: null, imageKey: "fasea4", correct: false },
        ],
        explanation: null,
        videoUrl: "https://youtu.be/Jq69s-GxzT4",
      },
      {
        text: "Qual será o resultado da soma das formas geométricas?",
        imageKey: "fase22",
        answers: [
          { text: null, imageKey: "faseb1", correct: false },
          { text: null, imageKey: "faseb2", correct: false },
          { text: null, imageKey: "faseb3", correct: true },
          { text: null, imageKey: "faseb4", correct: false },
        ],
        explanation: null,
        videoUrl: "https://youtu.be/Jq69s-GxzT4",
      },
      {
        text: "Com qual cor será preenchida a palavra roxo?",
        imageKey: "fase23",
        answers: [
          { text: "Vermelho", imageKey: null, correct: false },
          { text: "Amarelo", imageKey: null, correct: true },
          { text: "Roxo", imageKey: null, correct: false },
          { text: "Azul", imageKey: null, correct: false },
        ],
        explanation: null,
        videoUrl: "https://youtu.be/Jq69s-GxzT4",
      },
      {
        text: "Com qual cor será preenchida a palavra vermelho?",
        imageKey: "fase24",
        answers: [
          { text: "Branco", imageKey: null, correct: false },
          { text: "Marrom", imageKey: null, correct: false },
          { text: "Rosa", imageKey: null, correct: true },
          { text: "Cinza", imageKey: null, correct: false },
        ],
        explanation: null,
        videoUrl: "https://youtu.be/Jq69s-GxzT4",
      },
      {
        text: "Subtraindo o numero de lados das formas geométricas, qual será o resultado?",
        imageKey: "fase25",
        answers: [
          { text: "1", imageKey: null, correct: false },
          { text: "8", imageKey: null, correct: false },
          { text: "3", imageKey: null, correct: true },
          { text: "15", imageKey: null, correct: false },
        ],
        explanation: null,
        videoUrl: "https://youtu.be/Jq69s-GxzT4",
      },
    ]
  },
  {
    name: "Phase 3",
    questions: [
      {
        text: "Qual o resultado da soma das variáveis?",
        imageKey: "q1",
        answers: [
          { text: "7", imageKey: null, correct: true },
          { text: "34", imageKey: null, correct: false },
          { text: "4", imageKey: null, correct: false },
          { text: "8", imageKey: null, correct: false },
        ],
        explanation: "A maçã vale 4 (4 + 4 = 8) e o cachorro vale 3 (3 + 3 = 6), logo o resultado é 7",
      },
       {
        text: "Qual o resultado da soma das variáveis?",
        imageKey: "q2",
        answers: [
          { text: "12", imageKey: null, correct: false },
          { text: "7", imageKey: null, correct: false },
          { text: "15", imageKey: null, correct: true },
          { text: "9", imageKey: null, correct: false },
        ],
        explanation: "A casa vale 9 (9 + 9 = 18) e o prédio vale 6 (6 +6 = 12), logo o resultado é 15",
      },
         {
        text: "Que o resultado da subtração?",
        imageKey: "q3",
        answers: [
          { text: "5", imageKey: null, correct: false },
          { text: "14", imageKey: null, correct: false },
          { text: "37", imageKey: null, correct: false },
          { text: "2", imageKey: null, correct: true },
        ],
        explanation: "O gato vale 5 (5 + 5 = 10) e o cachorro vale 7 (7 + 7 = 14), logo o resultado da subtração é 2",
      },
        {
        text: "Qual o resultado da soma das variáveis?",
        imageKey: "q4",
        answers: [
          { text: "14", imageKey: null, correct: false },
          { text: "5", imageKey: null, correct: false },
          { text: "29", imageKey: null, correct: false },
           { text: "11", imageKey: null, correct: true },
        ],
        explanation: "O ônibus vale 6 (6 * 6= 36) e o carro vale 5 (5 * 5 = 25), logo o resultado é 11",
      },
     
        {
        text: "Qual o resultado da soma das variáveis?",
        imageKey: "q5",
        answers: [
          { text: "43", imageKey: null, correct: false },
          { text: "23", imageKey: null, correct: false },
          { text: "5", imageKey: null, correct: true },
          { text: "2", imageKey: null, correct: false },
        ],
        explanation: "O doende vale 2 (2 + 2 = 4) e o pote de ouro vale 10 (10 + 10 = 20), logo o resultado da divisão das variáveis é 5",
      },
   
    ]
  },
];
