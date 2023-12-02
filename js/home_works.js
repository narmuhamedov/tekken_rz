//gmail checker
    document.getElementById("gmail_button").addEventListener("click",  ()=> {
        const gmail_input = document.getElementById("gmail_input");
        const gmail_result = document.getElementById("gmail_result");

        // Регулярное выражение для проверки Gmail адреса
        const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (gmailRegExp.test(gmail_input.value)) {
            gmail_result.textContent = "You WIN";
            gmail_result.style.color = "green";
        } else {
            gmail_result.textContent = "You Lose";
            gmail_result.style.color = "red";
        }
    });


const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");
let x = 0;
let y = 0;
let directionX = 1;
let directionY = 0;
const speed = 2; // скорость движения блока

function move() {
    const maxWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
    const maxHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

    x += directionX * speed;
    y += directionY * speed;

    childBlock.style.left = x + "px";
    childBlock.style.top = y + "px";

    if (x >= maxWidth && directionX === 1) {
        directionX = 0;
        directionY = 1;
    } else if (y >= maxHeight && directionY === 1) {
        directionX = -1;
        directionY = 0;
    } else if (x <= 0 && directionX === -1) {
        directionX = 0;
        directionY = -1;
    } else if (y <= 0 && directionY === -1) {
        directionX = 1;
        directionY = 0;
    }

    setTimeout(move, 10); // Задержка для создания анимации движения
}

move(); // Запустить движение



let milliseconds = 0;
let intervalId;
let running = false;

function updateTimer() {
    milliseconds++;
    document.getElementById('ml-secondsS').innerText = formatTime(milliseconds);
}

function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 10);
    const remainder = milliseconds % 10;
    return `${seconds < 10 ? '0' : ''}${seconds}.${remainder}`;
}

document.getElementById('start').addEventListener('click', function() {
    if (!running) {
        intervalId = setInterval(updateTimer, 100);
        running = true;
    }
});

document.getElementById('stop').addEventListener('click', function() {
    if (running) {
        clearInterval(intervalId);
        running = false;
    }
});



