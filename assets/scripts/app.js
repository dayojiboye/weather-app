const key = '475f645f68c12685cd5c59765404046c';
const btn = document.querySelector('button');
const inputEl = document.getElementById('city');
const weatherInfo = document.getElementById('weather');
const errText = document.querySelector('.error-text');
const emoji = String.fromCodePoint(0x1F9D0);

class FetchWeather {
  constructor(button, element) {
    this.button = button;
    this.element = element;
  }

  render() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputEl.value.trim()}&appid=${key}&units=metric`
      )
      .then((response) => {
        const { main, name, sys, weather } = response.data;
        this.element.querySelector(
          '.city-name'
        ).innerHTML = `${name}<sup class="country"><img src="http://openweathermap.org/images/flags/${sys.country.toLowerCase()}.png" alt="country flag" /></sup>`;
        this.element.querySelector('.weather-temp').innerHTML = `${Math.round(
          main.temp
        )}<sup class="degree">&deg;C</sup>`;
        this.element.querySelector(
          '.weather-icon'
        ).src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        this.element.querySelector('figcaption').textContent =
          weather[0].description;
        this.element.classList.add('visible');
        inputEl.value = '';
        errText.textContent = '';
      })
      .catch((error) => {
        console.error(error);
        errText.textContent = `Please enter a valid city! ${emoji}`;
      });
  }

  getWeather() {
    this.button.addEventListener('click', this.render.bind(this));
  }
}

const fetchWeather = new FetchWeather(btn, weatherInfo);
fetchWeather.getWeather();
