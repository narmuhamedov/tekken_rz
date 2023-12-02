const car = document.getElementById('car');
const gameContainer = document.querySelector('.game-container');
const scoreboard = document.querySelector('.scoreboard');
let score = 0;
const scoreElement = document.getElementById('score');

function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

document.addEventListener('mousemove', (event) => {
    car.style.left = event.clientX - car.clientWidth / 2 + 'px';
    car.style.top = event.clientY - car.clientHeight / 2 + 'px';

    const coins = document.querySelectorAll('.coin');
    coins.forEach((coin) => {
        if (checkCollision(car, coin)) {
            handleCoinClick(coin);
        }
    });
});
var get_coin = Number(prompt('Введите колличество коинов для собирания?'))

function handleCoinClick(coin) {
    score++;
    scoreElement.textContent = score;
    coin.style.opacity = '0';
    coin.remove();

    if (score === get_coin) {
        showWinModal();
        resetScore();
    }
}

function showWinModal() {
    const modal = document.getElementById('myModal');
    const resetButton = document.getElementById('resetButton');

    modal.style.display = 'block';

    resetButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  function resetScore() {
    score = 0;
    scoreElement.textContent = score;
  }

function createCoin() {
    const coin = document.createElement('div');
    coin.className = 'coin';

    const maxX = gameContainer.clientWidth - 30;
    const maxY = gameContainer.clientHeight - 30;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    coin.style.left = randomX + 'px';
    coin.style.top = randomY + 'px';
    gameContainer.appendChild(coin);

    coin.addEventListener('click', () => {
        handleCoinClick(coin);
    });

    coin.style.transition = 'opacity 0.3s';
    coin.style.opacity = '1';

    setTimeout(() => {
        coin.remove();
        createCoin();
    }, 3000);
}

createCoin();

