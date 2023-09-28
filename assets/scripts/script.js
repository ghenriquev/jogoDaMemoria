const FRONT = 'card-front';
const BACK = 'card-back';
const startButton = $('#start-button');
const gameBoard = $('#gameBoard');
const gameContainer = $('#game-container');
const counters = $('.counters');
let counterContent = document.querySelector('.counter-content');
let counterMov = 0;
var interval;
counters.hide();
gameBoard.hide();
gameContainer.hide();

// Inicializa o jogo

function startGame() {
  let startScreen = $('#start-screen');
  startScreen.fadeOut(1000);
  game.createCardsFromTechs();
  initializeCards();
  return true;
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
          clearTimeout(timer());
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

      movementCounter();
    }
  }
}

// Função para restartar o jogo
function restart() {
  game.clearCards();
  restartCounters();
  startGame();
  timer();
  let gameOverLayer = document.querySelector('#gameOver');
  gameOverLayer.style.display = 'none';
}

// Personalização com jQuery

startButton.on('click', () => {
  setTimeout(() => {
    gameBoard.fadeIn(1000);
    counters.fadeIn(1000);
    gameContainer.fadeIn(1000);
    timer();
  }, 1000);
});

function timer() {
  $('.seconds').html('00');
  $('.minutes').html('00');

  let seconds = 0;
  let minutes = 0;
  minutes = seconds / 60;

  function zeroEsquerda(val) {
    return val > 9 ? val : '0' + val;
  }

  if (!interval) {
    interval = setInterval(() => {
      $('.seconds').html(zeroEsquerda(++seconds % 60));
      $('.minutes').html(zeroEsquerda(parseInt(minutes, 10)));
    }, 1000);
  }
}

function movementCounter() {
  counterMov++;
  counterContent.innerHTML = counterMov;
}

function restartCounters() {
  clearInterval(interval);
  interval = null;
  counterContent.innerHTML = "0";
  counterMov = 0;
}