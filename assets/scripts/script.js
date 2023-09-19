const FRONT = 'card-front';
const BACK = 'card-back';

// Inicializa o jogo
function startGame() {
  let startScreen = document.querySelector('#start-screen');
  startScreen.style.display = 'none';
  game.createCardsFromTechs();
  initializeCards();
}

// Função que inicializa as cartas
function initializeCards() {
  let gameBoard = document.querySelector('#gameBoard');
  gameBoard.innerHTML = '';

  game.cards.forEach((card) => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add('card');
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);

    gameBoard.appendChild(cardElement);
  });
}

// Função para criar o conteúdo das cartas no HTML, recebe o objeto da carta a ser criada e o elemento HTML que foi criado na função initializeCards()
function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

// Função para criar as duas faces das cartas no HTML, recebe a face, o objeto card e o elemento HTML do card
function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div');

  cardElementFace.classList.add(face);

  if (face === FRONT) {
    let iconElement = document.createElement('img');
    iconElement.classList.add('icon');
    iconElement.src = `./assets/images/${card.icon}.png`;
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = '&lt/&gt';
  }

  element.appendChild(cardElementFace);
}

// Função que adiciona a classe .flip em cada cardElement ao serem clicados
function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip');

    if (game.secondCard) {
      if (game.checkMatch()) {
        setTimeout(() => {
          let firstCardStyle = document.getElementById(game.firstCard.id);
          let secondCardStyle = document.getElementById(game.secondCard.id);

          firstCardStyle.firstChild.classList.add('transparency');
          firstCardStyle.firstChild.style.boxShadow = 'none';

          secondCardStyle.firstChild.classList.add('transparency');
          secondCardStyle.firstChild.style.boxShadow = 'none';

          game.clearCards();
        }, 1000);

        if (game.checkGameOver()) {
          setTimeout(() => {
            let gameOverLayer = document.querySelector('#gameOver');
            gameOverLayer.style.display = 'flex';
          }, 500);
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflipCards();
        }, 1000);
      }
    }
  }
}

// Função para restartar o jogo
function restart() {
  game.clearCards();
  startGame();
  let gameOverLayer = document.querySelector('#gameOver');
  gameOverLayer.style.display = 'none';
}
