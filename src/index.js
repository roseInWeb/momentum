const quoteZone = document.querySelector('.quote');
const authorZone = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
const greetingZone = document.querySelector('.greeting');
const slidePrevBtn = document.querySelector('.slide-prev');
const slideNextBtn = document.querySelector('.slide-next');
const nameZone = document.querySelector('.name');
const timeZone = document.querySelector('.time');
const dateZone = document.querySelector('.date');
const cityZone = document.querySelector('.city');
const windZone = document.querySelector('.wind');
const humidityZone = document.querySelector('.humidity');
const weatherIcon = document.querySelector('.weather-icon');
const tempZone = document.querySelector('.temperature');
const weatherDesc = document.querySelector('.weather-description');
let randomNumQuote = Math.round(Math.random() * 125);
let randomNumBg = Math.round(Math.random() * 20);
const urlRu = 'quotesRu.json';
const urlEn= 'quotesEn.json';
let date = new Date();


let str;
let weekday = date.getDay();
let mounth = date.getMonth();
let monthDay = date.getDate();
const weekdayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const mounthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function showDate() {
    weekday = date.getDay();
    mounth = date.getMonth();
    str = `${weekdayArr[weekday]}, ${mounthArr[mounth]} ${monthDay}`;
    dateZone.textContent = str;
}


let res;
let hours = date.getHours();
function getTimeOfDay() {
    hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        res = 'morning';
    } else if (hours >= 12 && hours < 18) {
        res = 'afternoon';
    } else if (hours > 0 && hours < 6) {
        res = 'night';
    } else {
        res = 'evening';
    }
}


function showGreeting() {
    getTimeOfDay();
    greetingZone.textContent = `Good ${res}`;
}


let currentTime = date.toLocaleTimeString();
function showTime() {
    date = new Date();
    currentTime = date.toLocaleTimeString();
    timeZone.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}
showTime();


// localStorage.clear();
function setLocalStorage() {
    localStorage.setItem('name', nameZone.value);
    localStorage.setItem('city', cityZone.value);
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
    if(localStorage.getItem('name')) {
        nameZone.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        cityZone.value = localStorage.getItem('city');
    }
}


let bgNum = `${randomNumBg}`.padStart(2, 0);
function setBg() {
    bgNum = `${bgNum}`.padStart(2, 0);
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${res}/${bgNum}.jpg`;
    img.onload = () => {      
        document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${res}/${bgNum}.jpg')`;
    };
}
setBg();

function getSlideNext() {
    if (bgNum == 20) {
        bgNum = 1;
        setBg();
    } else {
        bgNum++;
        setBg();
    }
}

function getSlidePrev() {
    if (bgNum == 1) {
        bgNum = 20;
        setBg();
    } else {
        bgNum--;
        setBg();
    }
}
slidePrevBtn.addEventListener('click', getSlidePrev);
slideNextBtn.addEventListener('click', getSlideNext);


async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityZone.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    if (res.ok) {
        document.querySelector('.weather-error').textContent = '';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        tempZone.textContent = `${Math.round(data.main.temp)}°C`;
        windZone.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidityZone.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
        weatherDesc.textContent = data.weather[0].description;
    } else {
        document.querySelector('.weather-error').textContent = 'Error! Invalid city name!!!';
        tempZone.textContent = '';
        humidityZone.textContent = '';
        windZone.textContent = '';
        weatherDesc.textContent = '';
    }
}
cityZone.addEventListener('change', getWeather);


getLocalStorage();
window.addEventListener('load', getWeather);


async function getData() {
    randomNumber = Math.round(Math.random() * 125);
    const res = await fetch(urlEn);
    const data = await res.json();
    quoteZone.textContent = data[randomNumber].text;
    authorZone.textContent = data[randomNumber].author;
}
getData();
changeQuoteBtn.addEventListener('click', getData);


const playList = [
    {      
      title: 'Aqua Caelestis',
      src: './assets/sounds/AquaCaelestis.mp3',
      duration: '00:40'
    },  
    {      
      title: 'River Flows In You',
      src: './assets/sounds/RiverFlowsInYou.mp3',
      duration: '01:37'
    },
    {      
      title: 'Ennio Morricone',
      src: './assets/sounds/EnnioMorricone.mp3',
      duration: '01:37'
    },
    {      
      title: 'Summer Wind',
      src: './assets/sounds/SummerWind.mp3',
      duration: '01:57'
    }
];
let playNum = 0;
let isPlay = false;
const audio = new Audio();
function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if(!isPlay) {
        audio.play();
        isPlay = true;
    } else {
        audio.pause();
        isPlay = false;
    }
    const ulLi = document.querySelectorAll('li');
    ulLi.forEach(el => el.classList.remove('item-active'));
    ulLi[playNum].classList.add('item-active');
}
const audioBtn = document.querySelector('.play');
function toggleBtn() {
    audioBtn.classList.toggle('pause');
}
audioBtn.addEventListener('click', toggleBtn);
audioBtn.addEventListener('click', playAudio);

const playListContainer = document.querySelector('.play-list');
for(let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[i].title;
    playListContainer.append(li);
}

function playNext() {
    if (playNum == 3) {
        playNum = 0;
    } else {
        playNum++;
    }
    const ulLi = document.querySelectorAll('li');
    ulLi.forEach(el => el.classList.remove('item-active'));
    ulLi[playNum].classList.add('item-active');
    audio.currentTime = 0;
    audio.src = playList[playNum].src;
    audio.play();
    isPlay = true;
    audioBtn.classList.add('pause');
}
function playPrev() {
    if (playNum == 0) {
        playNum = 3
    } else {
        playNum--;
    }
    audio.currentTime = 0;
    audio.src = playList[playNum].src;
    audio.play();
    isPlay = true;
    audioBtn.classList.add('pause');
    const ulLi = document.querySelectorAll('li');
    ulLi.forEach(el => el.classList.remove('item-active'));
    ulLi[playNum].classList.add('item-active');
}
document.querySelector('.play-prev').addEventListener('click', playPrev);
document.querySelector('.play-next').addEventListener('click', playNext)