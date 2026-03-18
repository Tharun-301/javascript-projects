const score = JSON.parse(localStorage.getItem('coin-score')) || {
  wins: 0,
  losses: 0
};

updateScore();

document.querySelector('.js-heads-button')
  .addEventListener('click', () => playGame('heads'));

document.querySelector('.js-tails-button')
  .addEventListener('click', () => playGame('tails'));

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    localStorage.removeItem('coin-score');
    updateScore();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
  });

function playGame(guess) {
  const randomNumber = Math.random();
  const result = randomNumber < 0.5 ? 'heads' : 'tails';

  if (guess === result) {
    score.wins++;
    document.querySelector('.js-result').innerHTML = '🎉 You Win!';
  } else {
    score.losses++;
    document.querySelector('.js-result').innerHTML = '😢 You Lose!';
  }

  document.querySelector('.js-moves').innerHTML =
    `You chose <strong>${guess}</strong> — Coin was <strong>${result}</strong>`;

  localStorage.setItem('coin-score', JSON.stringify(score));

  updateScore();
}

function updateScore() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins} | Losses: ${score.losses}`;
}