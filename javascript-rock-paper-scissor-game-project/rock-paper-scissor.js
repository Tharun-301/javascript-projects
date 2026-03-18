let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

const confirmBox = document.querySelector('.js-confirm-box');

// ⭐ Auto Play
document.querySelector('.js-auto-play-button')
  .addEventListener('click', autoPlay);

// ⭐ Reset button → show confirmation
document.querySelector('.js-reset-score-button')
  .addEventListener('click', showResetConfirmation);

// ⭐ YES reset
document.querySelector('.js-confirm-yes')
  .addEventListener('click', () => {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
    confirmBox.classList.add('hidden');
  });

// ⭐ NO reset
document.querySelector('.js-confirm-no')
  .addEventListener('click', () => {
    confirmBox.classList.add('hidden');
  });

// ⭐ Move buttons
document.querySelector('.js-rock-button')
  .addEventListener('click', () => playGame('rock'));

document.querySelector('.js-paper-button')
  .addEventListener('click', () => playGame('paper'));

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => playGame('scissors'));

// ⭐ Keyboard shortcuts
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') playGame('rock');
  if (event.key === 'p') playGame('paper');
  if (event.key === 's') playGame('scissors');

  // Backspace → show confirmation
  if (event.key === 'Backspace') {
    event.preventDefault();
    showResetConfirmation();
  }
});

function showResetConfirmation() {
  confirmBox.classList.remove('hidden');
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') result = 'You lose.';
    else if (computerMove === 'paper') result = 'You win.';
    else result = 'Tie.';
  }

  if (playerMove === 'paper') {
    if (computerMove === 'rock') result = 'You win.';
    else if (computerMove === 'paper') result = 'Tie.';
    else result = 'You lose.';
  }

  if (playerMove === 'rock') {
    if (computerMove === 'rock') result = 'Tie.';
    else if (computerMove === 'paper') result = 'You lose.';
    else result = 'You win.';
  }

  if (result === 'You win.') score.wins++;
  if (result === 'You lose.') score.losses++;
  if (result === 'Tie.') score.ties++;

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `
    You
    <img src="./${playerMove}-emoji.png" class="move-icon">
    <img src="./${computerMove}-emoji.png" class="move-icon">
    Computer
  `;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) return 'rock';
  if (randomNumber < 2 / 3) return 'paper';
  return 'scissors';
}