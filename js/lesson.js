//Phone Checker

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (reqExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = 'OK';
        phoneSpan.style.color = 'green';
    } else {
        phoneSpan.innerHTML = 'NOT OK';
        phoneSpan.style.color = 'red';
    }
})


//TAB SLOEDER

const tabsContentCards = document.querySelectorAll('.tab_content_block')
const tabsItems = document.querySelectorAll('.tab_content_item')
const tabsItemsParents = document.querySelector('.tab_content_items')

const hightTabsContentCards = () => {
    tabsContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active')
    })
}

const showTabsContentCards = (indexElement = 0) => {
    tabsContentCards[indexElement].style.display = 'block'
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

hightTabsContentCards()
showTabsContentCards()

tabsItemsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hightTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

let currentIndex = 0; // первая вкладка
let intervalId; // Переменная для хранения иинтервала

// Функция для автоматического переключения
const startAutoSlider = () => {
    intervalId = setInterval(() => {
        hightTabsContentCards();
        showTabsContentCards(currentIndex);
        currentIndex = (currentIndex + 1) % tabsItems.length; // Переключение на следующую вкладку
    }, 3000); // Интервал - каждые 3 секунды
};

// Запуск автослайда
startAutoSlider();

// Остановка автослайда при клике на вкладку
tabsItemsParents.onclick = (event) => {
    clearInterval(intervalId); // Остановка интервала при клике на вкладку
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hightTabsContentCards();
                showTabsContentCards(tabItemIndex);
                currentIndex = tabItemIndex; // Обновляем текущий индекс
                startAutoSlider(); // После клика запускаем автоматический слайдер снова
            }
        });
    }
};


//converter
const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')

//homework 7

const converter = (element, targetElement, type) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();

            switch (type) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2);
                    eurInput.value = (element.value / data.eur).toFixed(2);
                    if (element.value === '') {
                        usdInput.value = '';
                        eurInput.value = '';
                    }
                    break;
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2);
                    eurInput.value = (element.value * data.usd / data.eur).toFixed(2);
                    if (element.value === '') {
                        somInput.value = '';
                        eurInput.value = '';
                    }
                    break;
                case 'eur':
                    targetElement.value = (element.value * data.eur).toFixed(2);
                    usdInput.value = (element.value * data.eur / data.usd).toFixed(2);
                    if (element.value === '') {
                        somInput.value = '';
                        usdInput.value = '';
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
        }
    };
};



// const converter = (element, targetElement, type) => {
//     element.oninput = () => {
//         const request = new XMLHttpRequest()
//         request.open('GET', '../data/converter.json')
//         request.setRequestHeader('content-type', 'application/json')
//         request.send()
//
//         request.onload = () => {
//             const data = JSON.parse(request.response)
//             switch (type) {
//                 case 'som':
//                     targetElement.value = (element.value / data.usd).toFixed(2)
//                     eurInput.value = (element.value / data.eur).toFixed(2)
//                     if (element.value === '') {
//                         usdInput.value = ''
//                         eurInput.value = ''
//                     }
//                     break
//                 case 'usd':
//                     targetElement.value = (element.value * data.usd).toFixed(2)
//                     eurInput.value = (element.value * data.usd / data.eur).toFixed(2)
//                     if (element.value === '') {
//                         somInput.value = ''
//                         eurInput.value = ''
//                     }
//                     break
//                 case 'eur':
//                     targetElement.value = (element.value * data.eur).toFixed(2)
//                     usdInput.value = (element.value * data.eur / data.usd).toFixed(2)
//                     if (element.value === '') {
//                         somInput.value = ''
//                         usdInput.value = ''
//                     }
//                     break
//                 default:
//                     break
//             }
//             //element.value === '' && (targetElement.value = '')
//             // element.value === ''? targetElement.value = '':null
//             // if (type==='som'){
//             //     targetElement.value = (element.value / data.usd).toFixed(2)
//             // }else if (type==='usd'){
//             //     targetElement.value = (element.value * data.usd).toFixed(2)
//             // }
//         }
//     }
// }

converter(somInput, usdInput, 'som')
converter(usdInput, somInput, 'usd')
converter(eurInput, somInput, 'eur')

// somInput.addEventListener('input',(event)=>{
//     const request = new XMLHttpRequest()
//     request.open('GET', '../data/converter.json')
//     request.setRequestHeader('content-type', 'application/json')
//     request.send()
//
//     request.onload = () =>{
//         const data = JSON.parse(request.response)
//         usdInput.value = (somInput.value / data.usd).toFixed(2)
//
//
//     }
// })
//
// usdInput.addEventListener('input',(event)=>{
//     const request = new XMLHttpRequest()
//     request.open('GET', '../data/converter.json')
//     request.setRequestHeader('content-type', 'application/json')
//     request.send()
//
//     request.onload = () =>{
//         const data = JSON.parse(request.response)
//         somInput.value = (usdInput.value * data.usd).toFixed(2)
//
//
//     }
// })

//DRY

//
const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 1;
const totalCards = 200;

// Функция для получения данных о карточке
// Функция для получения данных о карточке
async function getCardData(cardNumber) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Функция обновления карточки с данными
function updateCard(cardData) {
    card.innerHTML = `
        <p>${cardData.title}</p>
        <p style="color: ${cardData.completed ? 'green' : 'yellow'}">${cardData.completed}</p>
        <span>${cardData.id}</span>
    `;
}

// Функция обработки кнопки Prev
async function showPrevCard() {
    count = (count === 1) ? totalCards : count - 1;
    const data = await getCardData(count);
    if (data) {
        updateCard(data);
    }
}

// Функция обработки кнопки Next
async function showNextCard() {
    count = (count === totalCards) ? 1 : count + 1;
    const data = await getCardData(count);
    if (data) {
        updateCard(data);
    }
}

// Показать первую карточку при загрузке страницы
window.addEventListener('DOMContentLoaded', async () => {
    const initialCardData = await getCardData(count);
    if (initialCardData) {
        updateCard(initialCardData);
    }
});


// Обработчики событий для кнопок prev и next
btnPrev.addEventListener('click', showPrevCard);
btnNext.addEventListener('click', showNextCard);


//HomeWork 6.2
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка при запросе:', error));


//weather

//optional chaining -?.
const cityNameInput = document.querySelector('.cityName'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')

const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

cityNameInput.oninput = async (event) => {
    try {
        const response = await fetch(`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
        const data = await response.json()
        city.innerHTML = data.name ? data.name : 'Город не найден...'
        temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + "&deg;C" : '...'
    } catch (e){
        console.log(e)
    }

}