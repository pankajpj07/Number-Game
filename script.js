'use strict';
const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');
const change = document.querySelector('.btn--change');
const help = document.querySelector('.btn--help');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const playerName0 = document.getElementById('name--0');
const playerName1 = document.getElementById('name--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const modal = document.querySelector('.modal');
const openModal = document.querySelectorAll('.show-modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const close = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

help.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});
closeModal.addEventListener('click', close);
overlay.addEventListener('click', close);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) close();
  }
});

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player0.classList.toggle('player--active');
};
const refresh = function () {
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  activePlayer = 0;
  scores = [0, 0];
};

rollDice.addEventListener('click', () => {
  const dice = Math.trunc(Math.random() * 6 + 1);
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

newGame.addEventListener('click', () => {
  refresh();
});

hold.addEventListener('click', () => {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 10) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    rollDice.disabled = true;
    hold.disabled = true;
    diceEl.src = 'gameOver.png';
  }
  switchPlayer();
});

change.addEventListener('click', () => {
  let firstPlayer = window.prompt('Enter Player1 name');
  let secondPlayer = window.prompt('Enter Player2 name');
  playerName0.textContent =
    firstPlayer === '' ? playerName0.textContent : firstPlayer;
  playerName1.textContent =
    secondPlayer === '' ? playerName0.textContent : secondPlayer;
});
