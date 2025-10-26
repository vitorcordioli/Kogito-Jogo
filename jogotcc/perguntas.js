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
          { text: "O algoritmo vem antes da lógica ", imageKey: null, correct: false },
          { text: "O algoritmo é mais importante que a lógica", imageKey: null, correct: false },
          { text: "Primeiro pensamos na solução, depois digitamos", imageKey: null, correct: true },
        ],
        explanation: "Primeiro, use lógica: pense no plano, como vou fazer assim. É o cérebro trabalhando. Depois, use a linguagem: escreva o plano no computador, como uma receita escrita. Lógica vem antes. É mais importante. Não são a mesma coisa.",
        videoUrl: "https://www.youtube.com/watch?v=sxt_3lcu3Hs",
      },
      {
        text: "Para que usamos a programação?",
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
        explanation: "Se cinza ganha cor vermelha, vermelho ganha cor a cinza. Elas trocam! Agora, se amarelo ganha cor roxa, roxa ganha a cor amarela.",
        videoUrl: "https://youtu.be/mWQGaHalYDk",
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
        explanation: "Se verde ganha cor azul, azul ganha a cor verde. Elas trocam! Agora, se rosa ganha cor vermelha, vermelho ganha a cor rosa.",
        videoUrl: "https://youtu.be/mWQGaHalYDk",
      },
      {
        text: "Subtraindo o número de lados das formas, qual o resultado?",
        imageKey: "fase25",
        answers: [
          { text: "1", imageKey: null, correct: false },
          { text: "8", imageKey: null, correct: false },
          { text: "3", imageKey: null, correct: true },
          { text: "15", imageKey: null, correct: false },
        ],
        explanation: "Quadrado tem 4 lados, triângulo tem 3. 4 - 3 = 1. Agora, hexágono tem 6 lados, triângulo tem 3. 6 - 3 = 3. Simples: conte os lados e subtraia!",
        videoUrl: "https://youtu.be/RtU4LmcZ36c",
      },
    ]
  },
  {
    name: "Phase 3",
    questions: [
      {
        text: "Qual o resultado da soma das frutas (maçã + laranja)?",
        imageKey: "q1",
        answers: [
          { text: "7", imageKey: null, correct: true },
          { text: "34", imageKey: null, correct: false },
          { text: "4", imageKey: null, correct: false },
          { text: "8", imageKey: null, correct: false },
        ],
        explanation: " Cada maçã vale 4. Cada laranja vale 3, então se somarmos 1 laranja (vale 3) + 1 maçã (vale 4) o resultado é 7 (3 + 4 = 7).",
      },
       {
        text: "Qual o resultado da soma das construções (casa + prédio)?",
        imageKey: "q2",
        answers: [
          { text: "12", imageKey: null, correct: false },
          { text: "7", imageKey: null, correct: false },
          { text: "15", imageKey: null, correct: true },
          { text: "9", imageKey: null, correct: false },
        ],
        explanation: "Cada casa vale 9. Cada prédio vale 6, então se somarmos 1 casa (vale 9) + 1 prédio (vale 6) o resultado é 15 (9 + 6 = 15).",
      },
         {
        text: "Qual o resultado da subtração dos animais (cachorro - gato)?",
        imageKey: "q3",
        answers: [
          { text: "12", imageKey: null, correct: false },
          { text: "14", imageKey: null, correct: false },
          { text: "37", imageKey: null, correct: false },
          { text: "2", imageKey: null, correct: true },
        ],
        explanation: "Cada gato vale 5. Cada cachorro vale 7, então se subtrairmos 1 cachorro (vale 7) - 1 gato (vale 5) o resultado é 2 (7 - 5 = 2).",
      },
        {
        text: "Qual o resultado da multiplicação (ônibus x carro )?",
        imageKey: "q4",
        answers: [
          { text: "14", imageKey: null, correct: false },
          { text: "5", imageKey: null, correct: false },
          { text: "29", imageKey: null, correct: false },
           { text: "12", imageKey: null, correct: true },
        ],
        explanation: "Cada ônibus vale 3. Cada carro vale 4, então se multiplicarmos 1 ônibus (vale 6) X 1 carro (vale 5) o resultado é  12(4 X 3 = 12).",
      },
     
        {
        text: "Qual o resultado da divisão (pote de ouro ÷ doende)?",
        imageKey: "q5",
        answers: [
          { text: "43", imageKey: null, correct: false },
          { text: "23", imageKey: null, correct: false },
          { text: "5", imageKey: null, correct: true },
          { text: "2", imageKey: null, correct: false },
        ],
        explanation: "Cada pote de ouro vale 10. Cada doende vale 2, então se dividirmos 1 pote de ouro (vale 10) ÷ 1 doende (vale 2) o resultado é  5 (10 ÷ 2 = 5).",
      },
   
    ]
  },
];
