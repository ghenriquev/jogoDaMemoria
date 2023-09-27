let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,
  techs: [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react',
  ],

  cards: null, 

  // Método que cria os objetos de todas as cartas
  createCardsFromTechs: function () {
    this.cards = [];

    this.techs.forEach((tech) => {
      this.cards.push(this.createPairFromTech(tech));
    });

    // Vamos usar o método flatMap() que vai mapear e "aplanar" o resultado, ou seja, vai pegar os pares que recebeu da função createPairFromTech() e separá-los em dois elementos distintos, criando assim as 20 cartas do tabuleiro.
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  // Método que cria o par de cartas de cada tecnologia
  createPairFromTech: function (tech) {
    return [
      { id: this.createIdWithTech(tech), icon: tech, flipped: false },
      { id: this.createIdWithTech(tech), icon: tech, flipped: false },
    ];
  },

  // Método para criar um ID distinto para cada carta
  createIdWithTech: (tech) => {
    return tech + parseInt(Math.random() * 1000);
  },

  // Método para embaralhar as cartas
  shuffleCards: function () {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  },

  // Método para definir as cartas
  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0]; // Esse filter vai filtrar somente o elemento que tenha o id igual o id passado por parâmetro
    if (card.flipped || this.lockMode) {
      return false;
    }

    // Esse if/else vai checar se o firstCard está nulo, se sim, coloca o card dentro dele, senão coloca no secondCard e entra em lockMode
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  // Método para checar se a primeira carta é igual à segunda
  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    } else {
      return this.firstCard.icon === this.secondCard.icon;
    }
  },

  // Método para limpar as variáveis das cartas e o lockMode
  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver: function () {
    return this.cards.filter((card) => card.flipped).length === 20;
  },
};
