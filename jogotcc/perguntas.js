const phases = [
  {
    name: "Phase 1",
    questions: [
      {
        text: "Qual é a cor do céu?",
        imageKey: null,
        answers: [
          { text: "Azul", correct: true },
          { text: "Verde", correct: false },
          { text: "Vermelho", correct: false },
          { text: "Amarelo", correct: false },
        ]
      },
      {
        text: "Qual é este animal?",
        imageKey: "pogona",
        answers: [
          { text: "Leão", correct: false },
          { text: "Pogona", correct: true },
          { text: "Gato", correct: false },
          { text: "Lobo", correct: false },
        ]
      },
      {
        text: "Quantos planetas tem o sistema solar?",
        backgroundKey: "pergunta2",
        answers: [
          { text: "7", correct: false },
          { text: "8", correct: true },
          { text: "9", correct: false },
          { text: "10", correct: false },
        ]
      }
    ]
  },
  {
    name: "Phase 2",
    questions: [
      {
        text: "Qual é o maior oceano do mundo?",
        imageKey: null,
        answers: [
          { text: "Atlântico", correct: false },
          { text: "Índico", correct: false },
          { text: "Pacífico", correct: true },
          { text: "Ártico", correct: false },
        ]
      },
      {
        text: "Qual é a capital da França?",
        imageKey: null,
        answers: [
          { text: "Roma", correct: false },
          { text: "Paris", correct: true },
          { text: "Londres", correct: false },
          { text: "Berlim", correct: false },
        ]
      },
      {
        text: "O que é H2O?",
        imageKey: null,
        answers: [
          { text: "Água", correct: true },
          { text: "Oxigênio", correct: false },
          { text: "Hidrogênio", correct: false },
          { text: "Ácido", correct: false },
        ]
      }
    ]
  }
];
